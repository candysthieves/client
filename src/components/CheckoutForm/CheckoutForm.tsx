'use client'

import { Button, Cards, Stripe, Typography, YooKassa } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { FormRadioGroup } from '@/components/FormRadioGroup'
import { useAuth } from '@/lib/hooks'
import { CheckoutFormData, PaymentService, PaymentSessionRequest } from '@/lib/model'
import { checkoutSchema } from '@/lib/model/subscriptions.schemas'
import { useAvailableAccountTypes } from '@/lib/subscriptions'
import { useSubscriptionCosts } from '@/lib/subscriptions/queries/useSubscriptionCosts'
import { getTariffLabel } from '@/lib/utils'
import s from './CheckoutForm.module.scss'

type CheckoutFormProps = {
  onSubmitAction: (data: PaymentSessionRequest) => void
}

export const CheckoutForm = ({ onSubmitAction }: CheckoutFormProps) => {
  const { user } = useAuth()

  const { control, handleSubmit, setValue, getValues } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      accountType: user?.subscription_type ?? 'Personal',
      tariff: '',
    },
  })

  // Logic for the automatic change back from Business to Personal after authMe 'subscription_type' change
  useEffect(() => {
    if (user?.subscription_type) {
      setValue('accountType', user.subscription_type, {
        shouldValidate: true,
      })
    }
  }, [user?.subscription_type, setValue])

  const accountType = useWatch({
    control,
    name: 'accountType',
  })

  const { data: availableAccountTypes } = useAvailableAccountTypes()
  const { data: subscriptionCosts } = useSubscriptionCosts(accountType)

  const accountTypeOptions = useMemo(
    () =>
      availableAccountTypes?.map(({ type }) => ({
        value: type,
        label: type,
      })) ?? [],
    [availableAccountTypes]
  )

  const subscriptionPlanOptions = useMemo(
    () =>
      subscriptionCosts?.map(({ tariff_name, price, currency }) => ({
        value: tariff_name,
        label: getTariffLabel(tariff_name, price, currency),
      })) ?? [],
    [subscriptionCosts]
  )

  // Logic for the automatic selection of the first tariff plan
  useEffect(() => {
    if (subscriptionPlanOptions.length > 0) {
      const currentTariff = getValues('tariff')

      // check whether the currently selected ID is present in the new list of tariffs
      const isValidTariff = subscriptionPlanOptions.some(option => option.value === currentTariff)

      // If the current plan is invalid (for example, an empty string upon initial load,
      // or the plan does not exist for a new account type), set it to the first one
      if (!isValidTariff) {
        setValue('tariff', subscriptionPlanOptions[0].value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    }
  }, [subscriptionPlanOptions, setValue, getValues])

  const onSubmitHandler = (data: CheckoutFormData, paymentProvider: PaymentService) => {
    const selectedTariff = subscriptionCosts?.find(
      subscription => subscription.tariff_name === data.tariff
    )

    const paymentData: PaymentSessionRequest = {
      provider: paymentProvider,
      tariffId: selectedTariff?.id ?? '',
    }

    onSubmitAction(paymentData)
  }

  return (
    <form className={s.subscriptionForm}>
      <div className={s.accountContent}>
        <Typography
          className={s.title}
          variant={'h3'}
          color={'var(--color-light-100)'}
          mb={'0.375rem'}
        >
          Account type:
        </Typography>

        <Cards className={s.subscriptionRadio}>
          <FormRadioGroup control={control} name={'accountType'} options={accountTypeOptions} />
        </Cards>
      </div>

      {subscriptionPlanOptions.length > 0 && (
        <>
          <div className={s.costsContent}>
            <Typography variant={'h3'} color={'var(--color-light-100)'} mb={'0.375rem'}>
              Your subscription costs:
            </Typography>

            <Cards className={s.subscriptionRadio}>
              <FormRadioGroup control={control} name={'tariff'} options={subscriptionPlanOptions} />
            </Cards>
          </div>

          <div className={s.subscriptionControls}>
            <Button
              type={'button'}
              variant={'text'}
              onClick={handleSubmit(data => onSubmitHandler(data, 'YOOKASSA'))}
              className={s.serviceButton}
              aria-label={'Payment service: YOOKASSA'}
            >
              <YooKassa size={64} />
            </Button>

            <Typography variant={'caption2'} color={'var(--color-light-100)'}>
              or
            </Typography>

            <Button
              type={'button'}
              variant={'text'}
              onClick={handleSubmit(data => onSubmitHandler(data, 'STRIPE'))}
              className={s.serviceButton}
              aria-label={'Payment service: STRIPE'}
            >
              <Stripe size={64} />
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
