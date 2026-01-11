import { HomeClient } from '@/components/shared'
import { getCategories, SearchParams } from '@/lib/get-categories'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const categories = await getCategories(params)

  return <HomeClient categories={categories} />
}
