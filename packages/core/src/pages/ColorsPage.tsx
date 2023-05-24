'use client'
import { Box } from '@chakra-ui/react'
import { postStoreData } from '@core/client/store'
import { ColorPaletteSection } from '@core/components/ColorPalette/ColorPaletteSection'
import useMirrorfulStore, {
  MirrorfulState,
} from '@core/store/useMirrorfulStore'
import { TTokenGroup } from '@core/types'
import { useAuthInfo } from '@propelauth/react'

export function ColorsPage({
  fetchStoreId,
}: {
  fetchStoreId: () => Promise<string>
}) {
  const authInfo = useAuthInfo()

  const {
    colors,
    typography,
    shadows,
    fileTypes,
    setColors,
    themes,
    metadata,
  } = useMirrorfulStore((state: MirrorfulState) => state)

  const handleUpdateColors = async (data: TTokenGroup) => {
    setColors(data)

    const storeId = await fetchStoreId()
    await postStoreData({
      newData: {
        primitives: {
          colors: data,
          typography,
          shadows,
        },
        themes,
        files: fileTypes,
        metadata,
      },
      authInfo: authInfo,
      storeId: storeId,
    })
  }
  return (
    <Box
      padding={{
        base: '24px 48px',
        md: '36px 72px',
        lg: '48px 96px',
      }}
    >
      <ColorPaletteSection
        colors={colors}
        onUpdateColors={handleUpdateColors}
      />
    </Box>
  )
}
