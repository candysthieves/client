import { ActionMenu, EditOutline, TrashOutline } from '@candy.thieves/ui-kit-lumos'

type Props = {
  isAuthor?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export const PostActionMenu = ({ isAuthor, onEdit, onDelete = () => {} }: Props) => {
  if (!isAuthor) {
    return null
  }

  return (
    <ActionMenu
      ariaLabel={'Open post actions'}
      items={[
        {
          icon: <EditOutline size={24} />,
          id: 'edit-post',
          label: 'Edit Post',
          onSelect: onEdit,
        },
        {
          icon: <TrashOutline size={24} />,
          id: 'delete-post',
          label: 'Delete Post',
          onSelect: onDelete,
        },
      ]}
    />
  )
}
