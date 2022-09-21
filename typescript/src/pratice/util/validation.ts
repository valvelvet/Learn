// 輸入驗證
namespace App {
  interface Validatable {
    value: string;
    key: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
  }
  export function Validate(input: Validatable) {
    let errorString: string = "";
    if (input.required) errorString += !!input.value ? "" : "  必填\n";

    if (input.maxLength != null && input.minLength != null)
      errorString +=
        input.value.length <= input.maxLength && input.value.length >= input.minLength
          ? ""
          : `  長度需介於 ${input.minLength}至 ${input.maxLength}之間\n`;
    else if (input.maxLength != null) errorString += input.value.length >= input.maxLength ? "" : `  長度限制最多 ${input.maxLength}字\n`;
    else if (input.minLength != null) errorString += input.value.length >= input.minLength ? "" : `  長度限制最少 ${input.minLength}字\n`;

    if (input.max != null && input.min != null)
      errorString += +input.value <= input.max && +input.value >= input.min ? "" : `  數字需介於 ${input.min}至 ${input.max}之間\n`;
    else if (input.max != null) errorString += +input.value >= input.max ? "" : `  數字限制最多 ${input.max}\n`;
    else if (input.min != null) errorString += +input.value >= input.min ? "" : `  數字限制最少 ${input.min}\n`;

    return errorString ? input.key + "：\n" + errorString : "";
  }
}
