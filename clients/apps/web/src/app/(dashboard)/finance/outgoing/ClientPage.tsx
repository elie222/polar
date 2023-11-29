'use client'

import Pagination, { usePagination } from '@/components/Shared/Pagination'
import AccountBanner from '@/components/Transactions/AccountBanner'
import TransactionsList from '@/components/Transactions/TransactionsList'
import { useAuth, usePersonalOrganization } from '@/hooks'
import { Separator } from 'polarkit/components/ui/separator'
import {
  useListAccountsByOrganization,
  useUserPaymentTransactions,
} from 'polarkit/hooks'

export default function ClientPage() {
  const { currentUser } = useAuth()
  const { currentPage, setCurrentPage } = usePagination()
  const personalOrganization = usePersonalOrganization()

  const organizationAccounts =
    useListAccountsByOrganization(personalOrganization?.id).data?.items ?? []

  const transactions = useUserPaymentTransactions({
    userId: currentUser?.id,
    page: currentPage,
  })

  return (
    <div className="flex flex-col gap-y-6">
      {personalOrganization && (
        <AccountBanner
          accounts={organizationAccounts}
          org={personalOrganization}
        />
      )}
      <div className="dark:bg-polar-900 dark:border-polar-800 min-h-[480px] rounded-3xl border border-gray-100 bg-white p-12">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-medium capitalize">Transactions</h2>
            <p className="dark:text-polar-500 text-sm text-gray-500">
              Payments made to maintainers on Polar
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <Pagination
          currentPage={currentPage}
          totalCount={transactions.data?.pagination.total_count ?? 0}
          pageSize={20}
          onPageChange={setCurrentPage}
        >
          <TransactionsList transactions={transactions.data?.items ?? []} />
        </Pagination>
      </div>
    </div>
  )
}
