import * as React from 'react'
import {
  Box,
  type ButtonProps,
  Center,
  Combobox,
  Dialog,
  HStack,
  Icon,
  IconButton,
  Text,
  useListCollection,
  VStack,
} from '@chakra-ui/react'
import { IconSearch, icons } from '@tabler/icons-react'
import { matchSorter } from 'match-sorter'
import { useRouter } from 'next/navigation'

import searchData from '@/components/search/search-data'
import Twemojify from '@/components/twemojify'

function SearchButton(props: ButtonProps) {
  return (
    <IconButton
      variant="ghost"
      size="sm"
      aria-label="Open search box"
      {...props}
      css={{
        _icon: {
          width: '5',
          height: '5',
        },
      }}
    >
      <IconSearch />
    </IconButton>
  )
}

export default function SearchMenu() {
  const [open, setOpen] = React.useState(false)

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const router = useRouter()

  const { collection, set } = useListCollection({
    initialItems: searchData,
    limit: 10,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    const filteredItems = matchSorter(searchData, details.inputValue, {
      keys: ['label', 'searchContent'],
    })
    set(filteredItems)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <SearchButton />
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content p="2" w={{ base: 'full', sm: 'lg' }}>
          <Combobox.Root
            open
            disableLayer
            collection={collection}
            onInputValueChange={handleInputChange}
            onValueChange={(e) => {
              setOpen(false)
              router.push(`${e.value}`)
            }}
            inputBehavior="autohighlight"
            selectionBehavior="clear"
            placeholder="Type to search"
            loopFocus={false}
          >
            <Combobox.Control>
              <Combobox.Input />
            </Combobox.Control>
            <Combobox.Content boxShadow="none" p={0}>
              <Combobox.Empty>
                <Center minH={12}>
                  <Text color="fg.muted" fontSize="sm">
                    No items found.
                  </Text>
                </Center>
              </Combobox.Empty>
              {collection.items.map((item) => {
                const IconSvg =
                  item.icon && item.icon in icons ? icons[item.icon as keyof typeof icons] : null
                return (
                  <Combobox.Item item={item} key={item.value} minH={16} persistFocus>
                    <HStack px={2}>
                      <Box minW="9">
                        {IconSvg && (
                          <Icon size="lg" color="fg.muted">
                            <IconSvg />
                          </Icon>
                        )}
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text color="fg" fontSize="sm" fontWeight="medium" truncate>
                          <Twemojify>{item.label}</Twemojify>
                        </Text>
                        {item.sublabel && (
                          <Text color="fg.muted" fontSize="xs" truncate>
                            <Twemojify>{item.sublabel}</Twemojify>
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </Combobox.Content>
          </Combobox.Root>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
