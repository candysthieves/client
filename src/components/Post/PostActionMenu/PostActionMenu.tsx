import { ActionMenu, EditOutline, TrashOutline } from '@candy.thieves/ui-kit-lumos'

type Props = {
  isAuthor?: boolean
  canEdit?: boolean
  deleteLabel?: string
  onEdit?: () => void
  onDelete?: () => void
}

export const PostActionMenu = ({
  isAuthor,
  canEdit = true,
  deleteLabel = 'Delete Post',
  onEdit,
  onDelete = () => {},
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
