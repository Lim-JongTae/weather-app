export const useUseMessage = () => {
  const toast = useToast()
  
  const showMessage = (content) => {
    toast.add({
      title: content.title,
      description: content.description,
      color: 'primary'
    })
  } 
  
  const showError = (error) => {
    toast.add({
      title: error.title,
      description: typeof error.description === 'string' ? error.description : '오류가 발생되었습니다.',      
      color: 'red'      
    })
  }
  return { showError, showMessage }
}
