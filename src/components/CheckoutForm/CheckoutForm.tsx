'use client'

import { Button, Cards, clsx, Stripe, Typography, YooKassa } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { FormRadioGroup } from '@/components/FormRadioGroup'
import { useAuth } from '@/lib/hooks'
import { CheckoutFormData, PaymentService } from '@/lib/model'
import { checkoutSchema } from '@/lib/model/subscriptions.schemas'
import { useAvailableAccountTypes } from '@/lib/subscriptions'
import { useSubscriptionCosts } from '@/lib/subscriptions/queries/useSubscriptionCosts'
import { getTariffLabel } from '@/lib/utils'
import s from './CheckoutForm.module.scss'

type CheckoutFormProps = {
  onSubmit: (data: CheckoutFormData, paymentProvider: PaymentService) => void
}

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const { user } = useAuth()

  const { control, handleSubmit } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      accountType: user?.subscription_type ?? 'Personal',
      subscriptionPlan: 'Daily',
    },
  })

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
      subscriptionCosts?.map(({ tariff_name, priceInMinorUnits, currency, durationDays }) => ({
        value: tariff_name,
        label: getTariffLabel(tariff_name, priceInMinorUnits, currency),
      })) ?? [],
    [subscriptionCosts]
  )

  const onSubmitHandler = (data: CheckoutFormData, paymentProvider: PaymentService) => {
    onSubmit(data, paymentProvider)
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

        <Cards className={clsx(s.subscriptionRadio, s.account)}>
          <FormRadioGroup control={control} name={'accountType'} options={accountTypeOptions} />
        </Cards>
      </div>

      {subscriptionPlanOptions.length > 0 && (
        <>
          <div className={s.costsContent}>
            <Typography
              className={s.title}
              variant={'h3'}
              color={'var(--color-light-100)'}
              mb={'0.375rem'}
            >
              Your subscription costs:
            </Typography>

            <Cards className={clsx(s.subscriptionRadio, s.costs)}>
              <FormRadioGroup
                control={control}
                name={'subscriptionPlan'}
                options={subscriptionPlanOptions}
              />
            </Cards>
          </div>

          <div className={s.subscriptionControls}>
            <Button
              type={'button'}
              variant={'text'}
              onClick={handleSubmit(data => onSubmitHandler(data, 'Yookassa'))}
              className={s.serviceButton}
              aria-label={'Payment service: Yookassa'}
            >
              <YooKassa size={64} />
            </Button>

            <Typography variant={'caption2'} color={'var(--color-light-100)'}>
              or
            </Typography>

            <Button
              type={'button'}
              variant={'text'}
              onClick={handleSubmit(data => onSubmitHandler(data, 'Stripe'))}
              className={s.serviceButton}
              aria-label={'Payment service: Stripe'}
            >
              <Stripe size={64} />
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
