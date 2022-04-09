// Get app theme from localStorage
const getAppTheme = () => {
    let theme = localStorage.getItem('app-dark-mode')
    return theme !== null ? JSON.parse(theme) : false
}

// Save app theme to localStorage
const saveAppTheme = (theme) => {
    localStorage.setItem('app-dark-mode', JSON.stringify(theme))
}

// Set app theme
const setAppTheme = (isDarkModeOn) => {
    if (isDarkModeOn) {
        setClassName(themeOptionIcon, 'fa-solid fa-sun')
        setTextContent(themeOptionText, 'Light mode')
        addClassToElement(bodyElement, 'dark-mode-on')
        saveAppTheme(isDarkModeOn)
    }   else {
        setClassName(themeOptionIcon, 'fa-solid fa-moon')
        setTextContent(themeOptionText, 'Dark mode')
        removeClassFromElement(bodyElement, 'dark-mode-on')
        saveAppTheme(isDarkModeOn)
    }
}

// Get value of string with leading and trailing whitspaces trimmed
const getTrimmedValue = (string) => {
    return string.trim()
}

// Hide an element in the DOM
const hideElement = (element) => {
    element.classList.add('hidden')
}

// Show an element in the DOM
const showElement = (element) => {
    element.classList.remove('hidden')
}

// Toggle a class in an element
const toggleClass = (element, className) => {
    element.classList.toggle(className)
}

// Toggle checkbox element
const toggleCheckboxElement = (element) => {
    element.checked = !element.checked
}

// Check if checkbox is checked
const isCheckboxElementChecked = (element) => {
    return element.checked
}

// Reset checkbox
const resetCheckboxElementValue = (element) => {
    element.checked = false
}

// Add a class to an element
const addClassToElement = (element, className) => {
    element.classList.add(className)
}

// Remove a class from an element
const removeClassFromElement = (element, className) => {
    element.classList.remove(className)
}

// Focus on an input element
const focusOnElement = (element) => {
    element.focus()
}

// Clear input value for an element
const clearValue = (element) => {
    element.value = ''
}

// Clear text content of an element
const clearTextContent = (element) => {
    element.textContent = ''
}

// Clear innerHTML of an element
const clearInnerHTML = (element) => {
    element.innerHTML = ''
}

// Set text content of an element
const setTextContent = (element, contentValue) => {
    element.textContent = contentValue
}

// Change class name of an element
const setClassName = (element, classNameValue) => {
    element.className = classNameValue
}

// Show full screen search
const showFullScreenSearch = (mobileSearchButton, headerLogo, headerSearch) => {
    hideElement(mobileSearchButton)
    hideElement(headerLogo)
    addClassToElement(headerSearch, 'full-screen-search')
}

// Hide full screen search
const hideFullScreenSearch = (mobileSearchButton, headerLogo, headerSearch) => {
    removeClassFromElement(headerSearch, 'full-screen-search')
    showElement(headerLogo)
    showElement(mobileSearchButton)
}

// Get current day's date
const getCurrentDate = () => {
    const d = new Date()

    const dayOfWeek = d.toString().slice(0, 3)

    let day = d.getDate()
    const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    day = day.length > 1 ? day : `0${day}`

    return {
        dayOfWeek: dayOfWeek,
        month: month,
        day: day,
        year: year
    }
}

// Get pending todos
const getPendingTodos = (todosArray) => {
    const pendingTodos = todosArray.filter((todosArrayItem) => {
        return !todosArrayItem.completed
    })

    return pendingTodos.length
}

// Get todos from localStorage
const getSavedTodos = () => {
    let savedTodos = localStorage.getItem('app-todos')
    return savedTodos !== null ? JSON.parse(savedTodos) : []
}

// Check if todos object is empty
const isTodosObjectEmpty = (todosObject) => {
    return todosObject.todosArr.length === 0
}

// Get empty todos object
const getEmptyTodosObjectIndex = (todosObject) => {
    return todos.indexOf(todosObject)
}

// Delete empty todos object from DOM
const removeEmptyTodosObjectFromDOM = (todos, index) => {
    if (index > -1) {
        todos.splice(index, 1)
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
    todos.forEach((todosObject) => {
        if (isTodosObjectEmpty(todosObject)) {
            const index = getEmptyTodosObjectIndex(todosObject)

            if (index > -1) {
                removeEmptyTodosObjectFromDOM(todos, index)
            }
        }
    })

    localStorage.setItem('app-todos', JSON.stringify(todos))
}

// Add element to array
const addElementToArray = (array, item) => {
    array.push(item)
}

// Create new todos object
const createNewTodosObject = (id) => {
    return {
        id: id,
        timestamp: Date.now(),
        todosArr: []
    }
}

// Create new todosArr property item
const createNewTodosArrItem = (itemContent) => {
    return {
        id: uuidv4(),
        timestamp: Date.now(),
        content: itemContent,
        completed: false
    }
}

// Get todos object id
const getTodosObjectId = (id) => {
    // console.log(`${id.slice(0, 3)}, ${id.slice(4, 7)} ${id.slice(8, 10)}, ${id.slice(11)}`)
    return `${id.slice(0, 3)} ${id.slice(4, 6)}, ${id.slice(7)}`
}

// Generate todo wrapper DOM
const generateTodoWrapperDOM = (todosWrapperNode, todosObject, pendingTodos) => {
    const todos = document.createElement('div')
    todos.setAttribute('class', 'todos')

    const todosTimestamp = document.createElement('div')
    todosTimestamp.setAttribute('class', 'todos__timestamp')

    const timestampId = document.createElement('div')
    timestampId.setAttribute('class', 'timestamp__id')
    setTextContent(timestampId, getTodosObjectId(todosObject.id))

    const timestampPendingTodos = document.createElement('div')
    timestampPendingTodos.setAttribute('class', 'timestamp__pending-todos')

    if (pendingTodos === 1) {
        setTextContent(timestampPendingTodos, `${pendingTodos} pending todo`)
    }   else {
        setTextContent(timestampPendingTodos, `${pendingTodos} pending todos`)
    }

    const todoWrapper = document.createElement('div')
    todoWrapper.setAttribute('class', 'todos__todo-wrapper')

    todosWrapperNode.appendChild(todos)
    todos.appendChild(todosTimestamp)
    todos.appendChild(todoWrapper)
    todosTimestamp.appendChild(timestampId)
    todosTimestamp.appendChild(timestampPendingTodos)
}

// Generate todo element DOM
const generateTodoElementDOM = (todoWrapperNode, todosObject, todosArrElement) => {
    const todo = document.createElement('div')
    todo.setAttribute('class', 'todo')

    // Add completed class to todo if it is completed
    todosArrElement.completed ? addClassToElement(todo, 'completed') : removeClassFromElement(todo, 'completed')

    const todoIconDiv = document.createElement('div')
    todoIconDiv.setAttribute('class', 'todo__icon')

    const todoIcon = document.createElement('i')
    todoIcon.setAttribute('class', 'fa-solid fa-layer-group')

    const todoContent = document.createElement('div')
    todoContent.setAttribute('class', 'todo__content')

    const contentText = document.createElement('div')
    contentText.setAttribute('class', 'content__text')
    contentText.textContent = todosArrElement.content

    const todoActions = document.createElement('div')
    todoActions.setAttribute('class', 'todo__actions')

    const todoActionsOverlay = document.createElement('div')
    todoActionsOverlay.setAttribute('class', 'actions-overlay hidden')

    const todoOptionsNav = document.createElement('nav')
    todoOptionsNav.setAttribute('class', 'todo__actions__options-nav hidden')

    const todoOptionsNavOptions = document.createElement('ul')
    todoOptionsNavOptions.setAttribute('class', 'options-nav__options')

    const editTodoTextOption = document.createElement('li')
    editTodoTextOption.setAttribute('class', 'options-nav__option')
    editTodoTextOption.textContent = 'Edit todo text'

    const markAsCompleteOption = document.createElement('li')
    markAsCompleteOption.setAttribute('class', 'options-nav__option')
    markAsCompleteOption.textContent = todosArrElement.completed ? 'Unmark as complete' : 'Mark as complete'

    const removeFromListOption = document.createElement('li')
    removeFromListOption.setAttribute('class', 'options-nav__option')
    removeFromListOption.textContent = 'Remove from the list'

    const todoActionsButton = document.createElement('button')
    todoActionsButton.setAttribute('class', 'todo__actions-btn')
    todoActionsButton.setAttribute('title', 'More actions')

    const todoActionsButtonIcon = document.createElement('i')
    todoActionsButtonIcon.setAttribute('class', 'fa-solid fa-ellipsis-vertical')

    // Remove completed todo modal
    const removeCompletedTodoModalObject = generateRemoveCompletedTodoFromListModalDOM(modalsNode)
    const removeCompletedTodoModal = removeCompletedTodoModalObject.modal
    const removeCompletedTodoModalCancelButton = removeCompletedTodoModalObject.cancelButton
    const removeCompletedTodoModalConfirmButton = removeCompletedTodoModalObject.confirmButton

    // Remove incomplete todo modal
    const removeInompletedTodoModalObject = generateRemoveIncompleteTodoFromListModalDOM(modalsNode)
    const removeIncompleteTodoModal = removeInompletedTodoModalObject.modal
    const removeIncompleteTodoModalCancelButton = removeInompletedTodoModalObject.cancelButton
    const removeIncompleteTodoModalConfirmButton = removeInompletedTodoModalObject.confirmButton

    // Mark as complete modal
    const markTodoAsCompleteModalObject = generateMarkTodoAsCompleteModalDOM(modalsNode)
    const markTodoAsCompleteModal = markTodoAsCompleteModalObject.modal
    const markTodoAsCompleteModalCancelButton = markTodoAsCompleteModalObject.cancelButton
    const markTodoAsCompleteModalConfirmButton = markTodoAsCompleteModalObject.confirmButton

    // Unmark as complete modal
    const unmarkTodoAsCompleteModalObject = generateUnmarkTodoAsCompleteModalDOM(modalsNode)
    const unmarkTodoAsCompleteModal = unmarkTodoAsCompleteModalObject.modal
    const unmarkTodoAsCompleteModalCancelButton = unmarkTodoAsCompleteModalObject.cancelButton
    const unmarkTodoAsCompleteModalConfirmButton = unmarkTodoAsCompleteModalObject.confirmButton

    todoActionsButton.addEventListener('click', () => {
        selectTodoElement(todo)

        showTodoActionsOptions(todoActionsOverlay, todoOptionsNav)

        todoActionsOverlay.addEventListener('click', () => {
            hideTodoActionsOptions(todoActionsOverlay, todoOptionsNav)
            removeClassFromElement(todo, 'selected')
        })

        // Edit todo text action
        editTodoTextOption.addEventListener('click', () => {
            // Hide todo actions nav
            hideTodoActionsOptions(todoActionsOverlay, todoOptionsNav)

            // Show todo info modal
            showModal(overlay, todoInfoModal)

            // Show todo creation date in modal header
            let todoCreationDate = getTodosObjectId(todosObject.id)
            setTextContent(todoInfoModalTimestamp, `Created on ${todoCreationDate}`)

            // Show stored todo content in textarea
            setTextContent(todoTextAreaField, todosArrElement.content)

            // Show todo completion status
            let status = todosArrElement.completed ? 'Done' : 'Pending'
            setTextContent(todoCompletionStatusField, status)

            if (status === 'Done') {
                removeClassFromElement(todoCompletionStatusField, 'status--pending')
                addClassToElement(todoCompletionStatusField, 'status--done')
            }   else {
                removeClassFromElement(todoCompletionStatusField, 'status--done')
                addClassToElement(todoCompletionStatusField, 'status--pending')
            }

            // Disable textarea field by default
            const disableAttribute = document.createAttribute('disabled')
            todoTextAreaField.setAttributeNode(disableAttribute)

            // Disable save button by default
            const disableAttributeClone = document.createAttribute('disabled')
            todoInfoModalSaveButton.setAttributeNode(disableAttributeClone)

            // Enable textarea if disabled on edit button click
            todoEditButton.addEventListener('click', () => {
                if (todoTextAreaField.hasAttribute('disabled')) {
                    todoTextAreaField.removeAttributeNode(disableAttribute)

                    // Enable Save button if edited value not equal to stored value
                    todoTextAreaField.addEventListener('input', () => {
                        if (getTrimmedValue(todoTextAreaField.value) !== todosArrElement.content) {
                            if (todoInfoModalSaveButton.hasAttribute('disabled')) {
                                todoInfoModalSaveButton.removeAttributeNode(disableAttributeClone)

                                // Save and render updated todos
                                todoInfoModalSaveButton.addEventListener('click', () => {
                                    todosObject.todosArr.forEach((item) => {
                                        if (item.id === todosArrElement.id) {
                                            item.content = getTrimmedValue(todoTextAreaField.value)
                                            saveTodos(todos)
                                        }
                                    })
                                
                                    clearTextContent(todoTextAreaField)
                                    closeModal(overlay, todoInfoModal)
                                    unselectTodoElement(todo)
                                    reloadPage()
                                    renderTodos(todosSummaryMessageContainer, todos, filters)
                                })
                            }
                        }
                    })
                }
            })

            // Exit edit modal
            todoInfoModalCancelButton.addEventListener('click', () => {
                clearTextContent(todoTextAreaField)
                closeModal(overlay, todoInfoModal)
                unselectTodoElement(todo)
            })
        })

        // Mark as complete action
        markAsCompleteOption.addEventListener('click', () => {
            // Hide todo actions nav
            hideTodoActionsOptions(todoActionsOverlay, todoOptionsNav)

            todosObject.todosArr.forEach((item) => {
                if (item.id === todosArrElement.id) {
                    if (markAsCompleteOption.textContent === 'Mark as complete') {
                        // Show Mark as Complete modal
                        showModal(overlay, markTodoAsCompleteModal)

                        // Listen for modal action cancel
                        markTodoAsCompleteModalCancelButton.addEventListener('click', () => {
                            // Close Mark as Complete modal
                            closeModal(overlay, markTodoAsCompleteModal)

                            // Unselect todo element
                            unselectTodoElement(todo)
                        })

                        // Listen for modal action confirm
                        markTodoAsCompleteModalConfirmButton.addEventListener('click', () => {
                            todosObject.todosArr.forEach((item) => {
                                if (item.id === todosArrElement.id) {
                                    if (!item.completed) {
                                        item.completed = true
                                        saveTodos(todos)
                                        reloadPage()
                                        renderTodos(todosSummaryMessageContainer, todos, filters)

                                        // Close Mark as Complete modal
                                        closeModal(overlay, markTodoAsCompleteModal)

                                        // Unselect todo element
                                        unselectTodoElement(todo)
                                    }
                                }
                            })
                        })
                    }   else if (markAsCompleteOption.textContent === 'Unmark as complete') {
                        // Show Unmark as Complete modal
                        showModal(overlay, unmarkTodoAsCompleteModal)

                        // Listen for modal action cancel
                        unmarkTodoAsCompleteModalCancelButton.addEventListener('click', () => {
                            // Close Mark as Complete modal
                            closeModal(overlay, unmarkTodoAsCompleteModal)

                            // Unselect todo element
                            unselectTodoElement(todo)
                        })

                        // Listen for modal action confirm
                        unmarkTodoAsCompleteModalConfirmButton.addEventListener('click', () => {
                            todosObject.todosArr.forEach((item) => {
                                if (item.id === todosArrElement.id) {
                                    if (item.completed) {
                                        item.completed = false
                                        saveTodos(todos)

                                        // Close Unmark as Complete modal
                                        closeModal(overlay, unmarkTodoAsCompleteModal)

                                        // Unselect todo element
                                        unselectTodoElement(todo)
                                    }

                                    reloadPage()
                                    renderTodos(todosSummaryMessageContainer, todos, filters)
                                }
                            })
                        })
                    }   else {
                        // Unselect todo element
                        unselectTodoElement(todo)
                    }
                }
            })
        })

        // Remove from list action
        removeFromListOption.addEventListener('click', () => {
            // Hide todo actions nav menu
            hideTodoActionsOptions(todoActionsOverlay, todoOptionsNav)

            todosObject.todosArr.forEach((item) => {
                if (item.id === todosArrElement.id) {
                    if (item.completed) {
                        // Show remove todo confirmation modal
                        showModal(overlay, removeCompletedTodoModal)

                        // Listen for modal action cancel
                        removeCompletedTodoModalCancelButton.addEventListener('click', () => {
                            // Close remove todo confirmaton modal
                            closeModal(overlay, removeCompletedTodoModal)

                            // Unselect selected todo
                            unselectTodoElement(todo)
                        })

                        // Listen for modal action confirm
                        removeCompletedTodoModalConfirmButton.addEventListener('click', () => {
                            todosObject.todosArr.forEach((todoElement, todoElementIndex) => {
                                if (todoElement.id === todosArrElement.id) {
                                    todosObject.todosArr.splice(todoElementIndex, 1)
                                    saveTodos(todos)
                                }
                            })

                            closeModal(overlay, removeCompletedTodoModal)
                            unselectTodoElement(todo)
                            showNotificationModal(overlay, todoDeletionNotificationSuccessModal)
                            reloadPageAfterDelay(delay)
                            renderTodos(todosSummaryMessageContainer, todos, filters)
                        })
                    }   else {
                        // Show remove todo confirmation modal
                        showModal(overlay, removeIncompleteTodoModal)

                        // Listen for modal action cancel
                        removeIncompleteTodoModalCancelButton.addEventListener('click', () => {
                            // Close remove todo confirmaton modal
                            closeModal(overlay, removeIncompleteTodoModal)

                            // Unselect selected todo
                            unselectTodoElement(todo)
                        })

                        // Listen for modal action confirm
                        removeIncompleteTodoModalConfirmButton.addEventListener('click', () => {
                            todosObject.todosArr.forEach((todoElement, todoElementIndex) => {
                                if (todoElement.id === todosArrElement.id) {
                                    todosObject.todosArr.splice(todoElementIndex, 1)
                                    saveTodos(todos)
                                }
                            })

                            closeModal(overlay, removeIncompleteTodoModal)
                            unselectTodoElement(todo)
                            showNotificationModal(overlay, todoDeletionNotificationSuccessModal)
                            reloadPageAfterDelay(delay)
                            renderTodos(todosSummaryMessageContainer, todos, filters)
                        })
                    }
                }
            })
        })
    })

    todoWrapperNode.appendChild(todo)
    todo.appendChild(todoIconDiv)
    todo.appendChild(todoContent)
    todo.appendChild(todoActions)
    todoIconDiv.appendChild(todoIcon)
    todoContent.appendChild(contentText)
    todoActions.appendChild(todoActionsOverlay)
    todoActions.appendChild(todoOptionsNav)
    todoOptionsNav.appendChild(todoOptionsNavOptions)
    todoOptionsNavOptions.appendChild(editTodoTextOption)
    todoOptionsNavOptions.appendChild(markAsCompleteOption)
    todoOptionsNavOptions.appendChild(removeFromListOption)
    todoActions.appendChild(todoActionsButton)
    todoActionsButton.appendChild(todoActionsButtonIcon)
}

// Get total pending todos
const getTotalPendingTodos = (todos) => {
    let totalPendingTodos = 0
    todos.forEach((todosObject) => {
        totalPendingTodos += getPendingTodos(todosObject.todosArr)
    })

    return totalPendingTodos
}

// Set total pending todos summary message
const setTotalPendingTodosSummaryMessage = (todosSummaryMessageContainer) => {
    const totalPendingTodos = getTotalPendingTodos(todos)

    let summaryMessage
    if (totalPendingTodos === 1) {
        summaryMessage = `${totalPendingTodos} total pending`
    }   else {
        summaryMessage = `${totalPendingTodos} total pending`
    }

    setTextContent(todosSummaryMessageContainer, summaryMessage)
}

// Get total matches
const getTotalMatches = (filteredTodos) => {
    let totalMatches = 0
    filteredTodos.forEach((filteredTodosObject) => {
        if (filteredTodosObject.todosArr.length > 0) {
            totalMatches += filteredTodosObject.todosArr.length
        }
    })

    return totalMatches
}

// Set matches found summary message
const setMatchesFoundSummaryMessage = (todosSummaryMessageContainer, filteredTodos) => {
    const totalMatches = getTotalMatches(filteredTodos)

    let matches
    if (totalMatches === 1) {
        matches = `${totalMatches} match found`
    }   else {
        matches = `${totalMatches} matches found`
    }
    setTextContent(todosSummaryMessageContainer, matches)
}

// Show no-todos message
const showNoTodosMessage = (messagesContainer, notodosMessage) => {
    removeClassFromElement(messagesContainer, 'hidden')
    removeClassFromElement(notodosMessage, 'hidden')
}

// Hide no-todos message
const hideNoTodosMessage = (messagesContainer, notodosMessage) => {
    addClassToElement(messagesContainer, 'hidden')
    addClassToElement(notodosMessage, 'hidden')
}

// Show not found message
const showNotFoundMessage = (messagesContainer, notFoundMessage) => {
    removeClassFromElement(messagesContainer, 'hidden')
    removeClassFromElement(notFoundMessage, 'hidden')
}

// Hide not found message
const hideNotFoundMessage = (messagesContainer, notFoundMessage) => {
    addClassToElement(messagesContainer, 'hidden')
    addClassToElement(notFoundMessage, 'hidden')
}

// Sort todos by timestamp
const sortArrayByTimestamp = (array) => {
    return array.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
            return -1
        }   else if (b.timestamp > a.timestamp) {
            return 1
        }   else {
            return 0
        }
    })
}

// Render todos on DOM
const renderTodos = (todosSummaryMessageContainer, todos, filters) => {
    if (filters.searchText.length > 0) {
        let filteredTodos = filterTodos(todos, filters.searchText)
        setMatchesFoundSummaryMessage(todosSummaryMessageContainer, filteredTodos)
    }   else {
        setTotalPendingTodosSummaryMessage(todosSummaryMessageContainer)
    }

    if (todos.length > 0) {
        clearInnerHTML(todosWrapper)
        hideNoTodosMessage(messagesContainer, notodosMessage)
        
        todos = sortArrayByTimestamp(todos)
        saveTodos(todos)

        todos.forEach((todosObject) => {
            generateTodoWrapperDOM(todosWrapper, todosObject, getPendingTodos(todosObject.todosArr))
            const todoWrappers = document.querySelectorAll('.todos__todo-wrapper')
            const todoWrapper = todoWrappers[todoWrappers.length - 1]

            todosObject.todosArr.forEach((todosArrElement) => {
                generateTodoElementDOM(todoWrapper, todosObject, todosArrElement)

                // Check and delete item if content is an empty string
                const index = todosObject.todosArr.findIndex((item) => {
                    return item.content === ''
                })

                if (index > -1) {
                    todosObject.todosArr.splice(index, 1)
                    saveTodos(todos)
                }

                todosObject.todosArr = sortArrayByTimestamp(todosObject.todosArr)

                todosObject.todosArr.sort((a, b) => {
                    if (!a.completed && b.completed) {
                        return -1
                    }   else if (!b.completed && a.completed) {
                        return 1
                    }   else {
                        return sortArrayByTimestamp(todosObject.todosArr)
                    }
                })

                saveTodos(todos)
            })
        })
    }   else {
        showNoTodosMessage(messagesContainer, notodosMessage)
    }
}

// Filter todos
const filterTodos = (todos, query) => {
    let filteredTodos = []
    todos.forEach((todosObject) => {
        let filteredTodosArr = []
        todosObject.todosArr.forEach((arrayElement) => {
            if (arrayElement.content.toLowerCase().includes(query.toLowerCase())) {
                filteredTodosArr.push(arrayElement)
            }
        })

        if (filteredTodosArr.length > 0) {
            filteredTodos.push({
                id: todosObject.id,
                timestamp: todosObject.timestamp,
                todosArr: filteredTodosArr
            })
        }
    })

    return filteredTodos
}

// Show todo actions options
const showTodoActionsOptions = (todoActionsOverlay, todoOptionsNav) => {
    removeClassFromElement(todoActionsOverlay, 'hidden')
    addClassToElement(todoActionsOverlay, 'show')
    removeClassFromElement(todoOptionsNav, 'hidden')
}

// Hide todo actions options
const hideTodoActionsOptions = (todoActionsOverlay, todoOptionsNav) => {
    removeClassFromElement(todoActionsOverlay, 'show')
    addClassToElement(todoActionsOverlay, 'hidden')
    addClassToElement(todoOptionsNav, 'hidden')
}

// Remove todo from list
const removeTodoFromList = (todoArray, todoIndex) => {
    if (todoIndex > -1) {
        todoArray.splice(todoIndex, 1)
    }
}

// Generate mark todo as complete modal
const generateMarkTodoAsCompleteModalDOM = (modalsNode) => {
    // Setup modal elements
    const modal = document.createElement('div')
    modal.setAttribute('class', 'modal modal--conf mark-todo-complete')

    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal__header')

    const modalTitle = document.createElement('div')
    modalTitle.setAttribute('class', 'modal-title')

    const modalHeaderIcon = document.createElement('div')
    modalHeaderIcon.setAttribute('class', 'modal__header-icon')

    const logoImage = document.createElement('img')
    logoImage.setAttribute('src', './img/logo.ico')
    logoImage.setAttribute('alt', 'logo-image')
    logoImage.setAttribute('class', 'logo-img')

    const modalHeaderTitle = document.createElement('div')
    modalHeaderTitle.setAttribute('class', 'modal__header-title')
    modalHeaderTitle.textContent = 'Mark todo'

    const modalBody = document.createElement('div')
    modalBody.setAttribute('class', 'modal__body')

    const modalConfText = document.createElement('div')
    modalConfText.setAttribute('class', 'modal--conf-text')
    modalConfText.textContent = 'Mark todo as complete?'

    const modalActions = document.createElement('div')
    modalActions.setAttribute('class', 'modal__actions')

    const markTodoAsCompleteModalActionCancelButton = document.createElement('button')
    markTodoAsCompleteModalActionCancelButton.setAttribute('class', 'btn modal__action modal__action--cancel')
    markTodoAsCompleteModalActionCancelButton.textContent = 'Cancel'

    const markTodoAsCompleteModalActionConfirmButton = document.createElement('button')
    markTodoAsCompleteModalActionConfirmButton.setAttribute('class', 'btn modal__action modal__action--confirm cta--hover')
    markTodoAsCompleteModalActionConfirmButton.textContent = 'OK'

    // Append modal elements
    modalsNode.appendChild(modal)

    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(modalActions)

    modalHeader.appendChild(modalTitle)

    modalTitle.appendChild(modalHeaderIcon)
    modalTitle.appendChild(modalHeaderTitle)

    modalHeaderIcon.appendChild(logoImage)

    modalBody.appendChild(modalConfText)

    modalActions.appendChild(markTodoAsCompleteModalActionCancelButton)
    modalActions.appendChild(markTodoAsCompleteModalActionConfirmButton)

    // Return modal object
    return {
        modal: modal,
        cancelButton: markTodoAsCompleteModalActionCancelButton,
        confirmButton: markTodoAsCompleteModalActionConfirmButton
    }
}

// Generate mark todo as incomplete modal
const generateUnmarkTodoAsCompleteModalDOM = (modalsNode) => {
    // Setup modal elements
    const modal = document.createElement('div')
    modal.setAttribute('class', 'modal modal--conf unmark-todo-complete')

    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal__header')

    const modalTitle = document.createElement('div')
    modalTitle.setAttribute('class', 'modal-title')

    const modalHeaderIcon = document.createElement('div')
    modalHeaderIcon.setAttribute('class', 'modal__header-icon')

    const logoImage = document.createElement('img')
    logoImage.setAttribute('src', './img/logo.ico')
    logoImage.setAttribute('alt', 'logo-image')
    logoImage.setAttribute('class', 'logo-img')

    const modalHeaderTitle = document.createElement('div')
    modalHeaderTitle.setAttribute('class', 'modal__header-title')
    modalHeaderTitle.textContent = 'Unmark todo'

    const modalBody = document.createElement('div')
    modalBody.setAttribute('class', 'modal__body')

    const modalConfText = document.createElement('div')
    modalConfText.setAttribute('class', 'modal--conf-text')
    modalConfText.textContent = 'Unmark todo as complete?'

    const modalActions = document.createElement('div')
    modalActions.setAttribute('class', 'modal__actions')

    const unmarkTodoAsCompleteModalActionCancelButton = document.createElement('button')
    unmarkTodoAsCompleteModalActionCancelButton.setAttribute('class', 'btn modal__action modal__action--cancel')
    unmarkTodoAsCompleteModalActionCancelButton.textContent = 'Cancel'

    const unmarkTodoAsCompleteModalActionConfirmButton = document.createElement('button')
    unmarkTodoAsCompleteModalActionConfirmButton.setAttribute('class', 'btn modal__action modal__action--confirm cta--hover')
    unmarkTodoAsCompleteModalActionConfirmButton.textContent = 'OK'

    // Append modal elements
    modalsNode.appendChild(modal)

    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(modalActions)

    modalHeader.appendChild(modalTitle)

    modalTitle.appendChild(modalHeaderIcon)
    modalTitle.appendChild(modalHeaderTitle)

    modalHeaderIcon.appendChild(logoImage)

    modalBody.appendChild(modalConfText)

    modalActions.appendChild(unmarkTodoAsCompleteModalActionCancelButton)
    modalActions.appendChild(unmarkTodoAsCompleteModalActionConfirmButton)

    // Return modal object
    return {
        modal: modal,
        cancelButton: unmarkTodoAsCompleteModalActionCancelButton,
        confirmButton: unmarkTodoAsCompleteModalActionConfirmButton
    }
}

// Generate remove completed todo from list modal
const generateRemoveCompletedTodoFromListModalDOM = (modalsNode) => {
    // Setup modal elements
    const modal = document.createElement('div')
    modal.setAttribute('class', 'modal modal--conf remove-todo')

    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal__header')

    const modalTitle = document.createElement('div')
    modalTitle.setAttribute('class', 'modal-title')

    const modalHeaderIcon = document.createElement('div')
    modalHeaderIcon.setAttribute('class', 'modal__header-icon')

    const logoImage = document.createElement('img')
    logoImage.setAttribute('src', './img/logo.ico')
    logoImage.setAttribute('alt', 'logo-image')
    logoImage.setAttribute('class', 'logo-img')

    const modalHeaderTitle = document.createElement('div')
    modalHeaderTitle.setAttribute('class', 'modal__header-title')
    modalHeaderTitle.textContent = 'Remove todo'

    const modalBody = document.createElement('div')
    modalBody.setAttribute('class', 'modal__body')

    const modalConfText = document.createElement('div')
    modalConfText.setAttribute('class', 'modal--conf-text')
    modalConfText.textContent = 'Remove todo from list?'

    const modalActions = document.createElement('div')
    modalActions.setAttribute('class', 'modal__actions remove-todo__actions')

    const removeTodoModalActionCancelButton = document.createElement('button')
    removeTodoModalActionCancelButton.setAttribute('class', 'btn modal__action modal__action--cancel remove-todo__action--cancel')
    removeTodoModalActionCancelButton.textContent = 'Cancel'

    const removeTodoModalActionConfirmButton = document.createElement('button')
    removeTodoModalActionConfirmButton.setAttribute('class', 'btn modal__action modal__action--confirm remove-todo__action--confirm cta--hover')
    removeTodoModalActionConfirmButton.textContent = 'OK'

    // Append modal elements
    modalsNode.appendChild(modal)

    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(modalActions)

    modalHeader.appendChild(modalTitle)

    modalTitle.appendChild(modalHeaderIcon)
    modalTitle.appendChild(modalHeaderTitle)

    modalHeaderIcon.appendChild(logoImage)

    modalBody.appendChild(modalConfText)

    modalActions.appendChild(removeTodoModalActionCancelButton)
    modalActions.appendChild(removeTodoModalActionConfirmButton)

    // Return modal object
    return {
        modal: modal,
        cancelButton: removeTodoModalActionCancelButton,
        confirmButton: removeTodoModalActionConfirmButton
    }
}

// Generate remove incomplete todo from list modal
const generateRemoveIncompleteTodoFromListModalDOM = (modalsNode) => {
    // Setup modal elements
    const modal = document.createElement('div')
    modal.setAttribute('class', 'modal modal--conf remove-todo')

    const modalHeader = document.createElement('div')
    modalHeader.setAttribute('class', 'modal__header')

    const modalTitle = document.createElement('div')
    modalTitle.setAttribute('class', 'modal-title')

    const modalHeaderIcon = document.createElement('div')
    modalHeaderIcon.setAttribute('class', 'modal__header-icon')

    const logoImage = document.createElement('img')
    logoImage.setAttribute('src', './img/logo.ico')
    logoImage.setAttribute('alt', 'logo-image')
    logoImage.setAttribute('class', 'logo-img')

    const modalHeaderTitle = document.createElement('div')
    modalHeaderTitle.setAttribute('class', 'modal__header-title')
    modalHeaderTitle.textContent = 'Remove todo'

    const modalBody = document.createElement('div')
    modalBody.setAttribute('class', 'modal__body')

    const modalConfText = document.createElement('div')
    modalConfText.setAttribute('class', 'modal--conf-text')
    modalConfText.textContent = 'Todo still pending. Remove from list anyway?'

    const modalActions = document.createElement('div')
    modalActions.setAttribute('class', 'modal__actions remove-todo__actions')

    const removeTodoModalActionCancelButton = document.createElement('button')
    removeTodoModalActionCancelButton.setAttribute('class', 'btn modal__action modal__action--cancel remove-todo__action--cancel')
    removeTodoModalActionCancelButton.textContent = 'Cancel'

    const removeTodoModalActionConfirmButton = document.createElement('button')
    removeTodoModalActionConfirmButton.setAttribute('class', 'btn modal__action modal__action--confirm remove-todo__action--confirm cta--hover')
    removeTodoModalActionConfirmButton.textContent = 'OK'

    // Append modal elements
    modalsNode.appendChild(modal)

    modal.appendChild(modalHeader)
    modal.appendChild(modalBody)
    modal.appendChild(modalActions)

    modalHeader.appendChild(modalTitle)

    modalTitle.appendChild(modalHeaderIcon)
    modalTitle.appendChild(modalHeaderTitle)

    modalHeaderIcon.appendChild(logoImage)

    modalBody.appendChild(modalConfText)

    modalActions.appendChild(removeTodoModalActionCancelButton)
    modalActions.appendChild(removeTodoModalActionConfirmButton)

    // Return modal object
    return {
        modal: modal,
        cancelButton: removeTodoModalActionCancelButton,
        confirmButton: removeTodoModalActionConfirmButton
    }
}

// Show modal
const showModal = (overlay, modal) => {
    removeClassFromElement(overlay, 'hidden')
    addClassToElement(modal, 'show')
}

// Close modal
const closeModal = (overlay, modal) => {
    removeClassFromElement(modal, 'show')
    addClassToElement(overlay, 'hidden')
}

// Auto-close notifictaion modal after delay
const autoCloseNotifictaionModalAfterDelay = (overlay, modal, delay = 2000) => {
    setTimeout(() => {
        closeModal(overlay, modal)
    }, delay)
}

// Show notification modal
const showNotificationModal = (overlay, modal) => {
    showModal(overlay, modal)

    // Close modal after 3 seconds
    autoCloseNotifictaionModalAfterDelay(overlay, modal, 3000)
}

// Select todo element
const selectTodoElement = (todoElement) => {
    addClassToElement(todoElement, 'selected')
}

// Unselect todo element
const unselectTodoElement = (todoElement) => {
    removeClassFromElement(todoElement, 'selected')
}

// Reload page
const reloadPage = () => {
    location.reload()
}

// Reload page after delay
const reloadPageAfterDelay = (delay) => {
    setTimeout(() => {
        reloadPage()
    }, delay)
}

// Remove completed todos
const removeCompletedTodos = (todos) => {
    todos.forEach((obj, objIndex) => {
        if (objIndex > -1) {
            obj.todosArr = obj.todosArr.filter((item) => {
                return !item.completed
            })
        }
    })

    saveTodos(todos)
}
