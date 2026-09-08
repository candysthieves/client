import { ActionMenu, EditOutline, TrashOutline } from '@candy.thieves/ui-kit-lumos'

type Props = {
  isAuthor?: boolean
  onEdit?: () => void
  onDelete?: () => void
  canEdit?: boolean
  deleteLabel?: string
}

export const PostActionMenu = ({
  isAuthor,
  onEdit,
  onDelete = () => {},
  canEdit = true,
  deleteLabel = 'Delete Post',
}: Props) => {
  if (!isAuthor) {
    return null
  }

  return (
    <ActionMenu
      ariaLabel={'Open post actions'}
      items={[
        ...(canEdit
          ? [
              {
                icon: <EditOutline size={24} />,
                id: 'edit-post',
                label: 'Edit Post',
                onSelect: onEdit,
              },
            ]
          : []),
        {
          icon: <TrashOutline size={24} />,
          id: 'delete-post',
          label: deleteLabel,
          onSelect: onDelete,
        },
      ]}
    />
  )
}
