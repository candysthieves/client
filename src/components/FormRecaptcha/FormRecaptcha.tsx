// import { Recaptcha, type RecaptchaProps } from '@candy.thieves/ui-kit-lumos'
// import { useController, type Control, type FieldValues, type Path } from 'react-hook-form'
//
// export type FormRecaptchaProps<T extends FieldValues> = Omit<
//   RecaptchaProps,
//   'errorMessage' | 'onChange'
// > & {
//   control: Control<T>
//   name: Path<T>
// }
//
// export const FormRecaptcha = <T extends FieldValues>({
//   control,
//   name,
//   ...props
// }: FormRecaptchaProps<T>) => {
//   const {
//     field: { onChange },
//     fieldState: { error },
//   } = useController({
//     control,
//     name,
//   })
//
//   return <Recaptcha {...props} onChange={onChange} errorMessage={error?.message} />
// }
