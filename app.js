const bodyElement = document.body

const greetingsModal = document.querySelector('#gm-modal')
const getStartedButton = document.querySelector('#get-started-button')

const menuWrapper = document.querySelector('.menu-wrapper')
const mobileMenuButton = document.querySelector('.logo__menu--mob')
const headerLogo = document.querySelector('.header__logo')
const mobileSearchButton = document.querySelector('.header__search--mob')
const headerSearch = document.querySelector('.header__search')
const headerSearchBox = document.querySelector('.search-wrapper .search #searchbox')
const clearSearchOption = document.querySelector('.search-wrapper .search .search__clear')
const searchCloseButtonMobile = document.querySelector('.search__close--mob')

const themeCheckbox = document.querySelector('#themeChkbx')
const themeOptionIcon = document.querySelector('#toggle-dark-mode-option i.fa-solid')
const themeOptionText = document.querySelector('#toggle-dark-mode-option .item-desc')

const newTodoButton = document.querySelector('#new-todo-btn')
const newTodoForm = document.querySelector('#new-todo-form')
const todoInputText = document.querySelector('#todo-input-text')

const overlay = document.querySelector('#overlay')
const openModals = document.querySelectorAll('.modal')
const newTodoModal = document.querySelector('#new-todo-modal')
const aboutAppModal = document.querySelector('#about-app-modal')
const removeAllConfirmationModal = document.querySelector('#remove-all-conf-modal')
const removeAllConfirmationModalCancelButton = document.querySelector('.modal.modal--conf .modal__action--cancel')
const removeAllConfirmationModalConfirmButton = document.querySelector('.modal.modal--conf .modal__action--confirm')
const modalCloseButtons = document.querySelectorAll('.modal-close')
const todoInfoModal = document.querySelector('#todo-info-modal')
const todoInfoModalTimestamp = document.querySelector('.todo-timestamp')
const todoEditButton = document.querySelector('.todo-edit')
const todoTextAreaField = document.querySelector('.todo-textarea')
const todoCompletionStatusField = document.querySelector('.todo-status__value')
const todoInfoModalCancelButton = document.querySelector('.info-modal__actions .modal__action--cancel')
const todoInfoModalSaveButton = document.querySelector('.info-modal__actions .modal__action--confirm')

const aboutAppOption = document.querySelector('#about-app-option')
const toggleDarkModeOption = document.querySelector('#toggle-dark-mode-option')
const removeCompletedOption = document.querySelector('#remove-completed-option')

const todosSummaryMessageContainer = document.querySelector('.todos-summary__message')
const todosWrapper = document.querySelector('.todos-wrapper')

const messagesContainer = document.querySelector('.msgs')
const notodosMessage = document.querySelector('.no-todos-msg')
const notFoundMessage = document.querySelector('.not-found-msg')

const modalsNode = document.querySelector('.modals')

const delay = 3000
const todoCreationNotificationSuccessModal = document.querySelector('#todo-creation-success-nm')
const todoDeletionNotificationSuccessModal = document.querySelector('#todo-deletion-success-nm')
const todoCompletedDeletionAllNotificationSuccessModal = document.querySelector('#todo-completed-all-deletion-success-nm')

// Get saved todos
let todos = getSavedTodos()

// Setup filters object
let filters = {
    searchText: ''
}

// Show greeting message modal on Page load if todo-list is empty
bodyElement.onload = () => {
    if (todos.length > 0) {
        // Render todos
        renderTodos(todosSummaryMessageContainer, todos, filters)
    }   else {
        // Show greetings messsage
        showModal(overlay, greetingsModal)

        getStartedButton.addEventListener('click', () => {
            closeModal(overlay, greetingsModal)
            renderTodos(todosSummaryMessageContainer, todos, filters)
        })
    }
}

// Apply saved app theme
themeCheckbox.checked = getAppTheme()
setAppTheme(themeCheckbox.checked)

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
    toggleClass(menuWrapper, 'toggle-menu')
})

// Search todos
headerSearchBox.addEventListener('input', () => {
    let query = getTrimmedValue(headerSearchBox.value)
    filters.searchText = query
    
    if (query.length > 0) {
        showElement(clearSearchOption)

        clearSearchOption.addEventListener('click', () => {
            clearValue(headerSearchBox)
            hideElement(clearSearchOption)
            focusOnElement(headerSearchBox)
        })
    }   else {
        hideElement(clearSearchOption)
    }
})

// Toggle full screen mobile search
mobileSearchButton.addEventListener('click', () => {
    showFullScreenSearch(mobileSearchButton, headerLogo, headerSearch)

    focusOnElement(headerSearchBox)
    headerSearchBox.addEventListener('input', () => {
        let query = getTrimmedValue(headerSearchBox.value)
        filters.searchText = query
        
        if (query.length > 0) {
            showElement(clearSearchOption)

            clearSearchOption.addEventListener('click', () => {
                clearValue(headerSearchBox)
                hideElement(clearSearchOption)
                focusOnElement(headerSearchBox)
            })
        }   else {
            hideElement(clearSearchOption)
        }
    })

    searchCloseButtonMobile.addEventListener('click', () => {
        hideFullScreenSearch(mobileSearchButton, headerLogo, headerSearch)
        clearValue(headerSearchBox)
        hideElement(clearSearchOption)
    })
})

// Add new todo
newTodoButton.addEventListener('click', () => {
    removeClassFromElement(overlay, 'hidden')
    addClassToElement(newTodoModal, 'show')
    focusOnElement(todoInputText)

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const todoText = getTrimmedValue(todoInputText.value)

        const currentDate = getCurrentDate()
        const currentMonth = currentDate.month
        const currentDay = currentDate.day
        const currentYear = currentDate.year

        let todosId = `${currentMonth}-${currentDay}-${currentYear}`
        let todosElement = document.querySelector(`#${todosId}`)

        if (todosElement === null && todoText.length > 0) {
            const todosObject = createNewTodosObject(todosId)

            addElementToArray(todos, todosObject)

            todosElement = todos.find((todosObject) => {
                return todosObject.id === todosId
            })

            if (todosElement !== null && todoText.length > 0) {
                const todosArrayItem = createNewTodosArrItem(todoText)
                addElementToArray(todosElement.todosArr, todosArrayItem)
                todos = sortArrayByTimestamp(todos)
                todos.forEach((todosObject) => {
                    todosObject.todosArr = sortArrayByTimestamp(todosObject.todosArr)
                })
                saveTodos(todos)
                renderTodos(todosSummaryMessageContainer, todos, filters)

                clearValue(todoInputText)
                addClassToElement(overlay, 'hidden')
                removeClassFromElement(newTodoModal, 'show')
            }   else {
                clearValue(todoInputText)
                focusOnElement(todoInputText)
            }
        }   else {
            todosElement = todos.find((todosObject) => {
                return todosObject.id === todosId
            })

            if (todosElement !== null && todoText.length > 0) {
                const todosArrayItem = createNewTodosArrItem(todoText)
                addElementToArray(todosElement.todosArr, todosArrayItem)
                todos = sortArrayByTimestamp(todos)
                todos.forEach((todosObject) => {
                    todosObject.todosArr = sortArrayByTimestamp(todosObject.todosArr)
                })
                saveTodos(todos)
                renderTodos(todosSummaryMessageContainer, todos, filters)

                clearValue(todoInputText)
                addClassToElement(overlay, 'hidden')
                removeClassFromElement(newTodoModal, 'show')
            }   else {
                clearValue(todoInputText)
                focusOnElement(todoInputText)
            }
        }

        showNotificationModal(overlay, todoCreationNotificationSuccessModal)
        reloadPageAfterDelay(delay)
    })
})

// Close modal on button click
modalCloseButtons.forEach((modalCloseButton) => {
    modalCloseButton.addEventListener('click', () => {
        openModals.forEach((openModal) => {
            removeClassFromElement(openModal, 'show')
        })
        addClassToElement(overlay, 'hidden')
    })
})

// Toggle about modal
aboutAppOption.addEventListener('click', () => {
    removeClassFromElement(overlay, 'hidden')
    addClassToElement(aboutAppModal, 'show')
})

// Toggle dark mode
toggleDarkModeOption.addEventListener('click', () => {
    toggleCheckboxElement(themeCheckbox)
    setAppTheme(themeCheckbox.checked)

    if (isCheckboxElementChecked(themeCheckbox)) {
        addClassToElement(bodyElement, 'dark-mode-on')
    }   else {
        removeClassFromElement(bodyElement, 'dark-mode-on')
    }
})

// Search todos
headerSearchBox.addEventListener('input', (e) => {
    let query = getTrimmedValue(e.target.value)
    filters.searchText = query

    clearSearchOption.addEventListener('click', () => {
        query = ''
        filters.searchText = query
        hideNotFoundMessage(messagesContainer, notFoundMessage)
        renderTodos(todosSummaryMessageContainer, todos, filters)
    })

    if (query.length > 0) {
        if (todos.length > 0) {
            let filteredTodos = filterTodos(todos, query)

            if (filteredTodos.length > 0) {
                clearInnerHTML(todosWrapper)
                hideNotFoundMessage(messagesContainer, notFoundMessage)
                renderTodos(todosSummaryMessageContainer, filteredTodos, filters)
            }   else {
                clearInnerHTML(todosWrapper)
                setTextContent(todosSummaryMessageContainer, `${filteredTodos.length} matches`)
                showNotFoundMessage(messagesContainer, notFoundMessage)
            }
        }
    }   else {
        hideNotFoundMessage(messagesContainer, notFoundMessage)
        renderTodos(todosSummaryMessageContainer, todos, filters)
    }
})

// Remove completed todos
removeCompletedOption.addEventListener('click', () => {
    // Show Remove completed modal
    showModal(overlay, removeAllConfirmationModal)

    removeAllConfirmationModalCancelButton.addEventListener('click', () => {
        closeModal(overlay, removeAllConfirmationModal)
        renderTodos(todosSummaryMessageContainer, todos, filters)
    })

    removeAllConfirmationModalConfirmButton.addEventListener('click', () => {
        removeCompletedTodos(todos)
        // reloadPage()
        showNotificationModal(overlay, todoCompletedDeletionAllNotificationSuccessModal)
        renderTodos(todosSummaryMessageContainer, todos, filters)
        closeModal(overlay, removeAllConfirmationModal)
    })
})