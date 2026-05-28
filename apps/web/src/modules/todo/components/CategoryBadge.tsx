import { useTranslation } from 'react-i18next'
import { CATEGORY_COLORS } from '@/shared/constants/categories'
import type { TodoCategory } from '@/shared/constants/categories'
import './todo.css'

export function CategoryBadge({ category }: { category: TodoCategory }) {
  const { t } = useTranslation()
  return (
    <span className="category-badge">
      <span className="category-badge__dot" style={{ backgroundColor: CATEGORY_COLORS[category] }} />
      {t(`category.${category}`)}
    </span>
  )
}
