export const REGEX = {
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  EMAIL_DOMAIN: /^[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
  LETTER_8: /^.{8,}$/,
  NUMBER_AND_LETTER: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
  DATE_TIME:
    /^\d{4}[./-](0[1-9]|1[0-2])[./-](0[1-9]|[12]\d|3[01])\s(0\d|1\d|2[0-3]):([0-5]\d)$/,
  LINK: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/\S*)?$/,
  IMAGE: /^image\/(jpeg|png|gif|bmp|webp|svg\+xml)$/,
  PHONE_NUMBER: /^\d{3}-?\d{4}-?\d{4}$/,
  BLOB_URL: /^blob:[\w-]+:\/\/.+\/[a-fA-F0-9-]{36}$/,
  BASE64_URL: /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)?;base64,[A-Za-z0-9+/=]+$/,
}
