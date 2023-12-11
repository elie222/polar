'use client'

import {
  Article,
  Organization,
  Repository,
  SubscriptionSummary,
  SubscriptionTier,
  SubscriptionTierType,
} from '@polar-sh/sdk'
import { useSearchParams } from 'next/navigation'
import { LogoType } from 'polarkit/components/brand'
import { Tabs } from 'polarkit/components/ui/atoms'
import { useEffect, useMemo, useState } from 'react'
import {
  OrganizationPublicPageContent,
  OrganizationPublicPageNav,
} from './OrganizationPublicPageNav'
import { OrganizationPublicSidebar } from './OrganizationPublicSidebar'

const OrganizationPublicPage = ({
  posts,
  organization,
  repositories,
  subscriptionTiers,
  subscriptionSummary,
  subscribersCount,
  onFirstRenderTab,
}: {
  posts: Article[]
  organization: Organization
  repositories: Repository[]
  subscriptionTiers: SubscriptionTier[]
  subscriptionSummary: SubscriptionSummary[]
  subscribersCount: number
  onFirstRenderTab?: string
}) => {
  const freeSubscriptionTier = useMemo(
    () =>
      subscriptionTiers.find((tier) => tier.type === SubscriptionTierType.FREE),
    [subscriptionTiers],
  )

  // externally controlled tabs, react to changes in searchParams and set the tab value
  const [tab, setTab] = useState<string>(onFirstRenderTab ?? 'overview')
  const searchParams = useSearchParams()
  useEffect(() => {
    const searchTab = searchParams?.get('tab')
    if (searchTab && searchTab !== tab) {
      setTab(searchTab)
    }
  }, [searchParams, tab])

  return (
    <>
      <Tabs
        className="flex min-h-screen flex-col justify-between"
        value={tab}
        onValueChange={(v) => setTab(v)}
      >
        <div className="flex flex-col px-4 md:px-8">
          <div className="relative flex w-full flex-row items-center justify-between gap-x-24 md:justify-normal">
            <div className="shrink-0 md:w-64">
              <a href="/">
                <LogoType />
              </a>
            </div>
            <OrganizationPublicPageNav
              shouldRenderSubscriptionsTab={subscriptionTiers.length > 0}
            />
          </div>
          <div className="relative flex w-full flex-col gap-x-24 py-16 md:flex-row">
            <OrganizationPublicSidebar
              organization={organization}
              freeSubscriptionTier={freeSubscriptionTier}
              subscribersCount={subscribersCount}
              subscriptionSummary={subscriptionSummary}
            />
            <OrganizationPublicPageContent
              organization={organization}
              posts={posts}
              repositories={repositories}
              subscriptionTiers={subscriptionTiers}
            />
          </div>
        </div>
      </Tabs>
    </>
  )
}

export default OrganizationPublicPage
