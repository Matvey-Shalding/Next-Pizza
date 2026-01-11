import { Story, StoryItem } from '@prisma/client'

export type StoryWithItems = Story & { items: StoryItem[] }
