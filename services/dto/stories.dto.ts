import { Story, StoryItem } from '@/prisma/generated/prisma'

export type StoryWithItems = Story & { items: StoryItem[] }
