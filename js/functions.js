// Getter functions

// Get theme from localStorage
const getSavedTheme = () => {
    let theme = localStorage.getItem('todo-app-dark-mode')
    return theme !== null ? JSON.parse(theme) : false
}

// Get current day's date
const getCurrentDate = () => {
    const d = new Date()
    let day = d.getDate()
    const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    day = day.length > 1 ? day : `0${day}`

    return {
        day: day,
        month: month,
        year: year
    }
}

// Get todos from localStorage
const getSavedTodos = () => {
    let savedTodos = localStorage.getItem('todos')
    return savedTodos !== null ? JSON.parse(savedTodos) : []
}

// Get pending todos
const getPendingTodos = (todos) => {
    let pendingTodos = 0

    todos.forEach((todo) => {
        todo.todosArr.forEach((item) => {
            if (!item.completed) {
                pendingTodos += 1
            }
        })
    })

    return pendingTodos
}

// Setter functions

// Save todos to localStorage
const saveTodos = (todos) => {
    todos.forEach((obj) => {
        if (obj.todosArr.length === 0) {
            const index = todos.indexOf(obj)
            console.log(index)

            if (index > -1) {
                todos.splice(index, 1)
            }
        }
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}

// Reset overlay background to transparent
const resetOverlayBackground = () => {
    overlay.style.background = 'transparent'
}

// Set theme
const setTheme = (isDarkModeOn) => {
    if (isDarkModeOn) {
        themeOptionIcon.className = 'fa-solid fa-sun'
        themeOptionText.textContent = 'Light mode'
        bodyEl.classList.add('toggle-dark-mode')
    }   else {
        themeOptionIcon.className = 'fa-solid fa-moon'
        themeOptionText.textContent = 'Dark mode'
        bodyEl.classList.remove('toggle-dark-mode')
    }

    saveTheme(isDarkModeOn)
}

// Save theme to localStorage
const saveTheme = (theme) => {
    localStorage.setItem('todo-app-dark-mode', JSON.stringify(theme))
}

// Render todos on screen
const renderTodos = (todos) => {
    const pendingTodos = getPendingTodos(todos)

    if (todos.length === 0) {
        summaryMessage.textContent = ''
    } else if (pendingTodos === 1) {
        summaryMessage.textContent = `${pendingTodos} pending todo`
    }   else {
        summaryMessage.textContent = `${pendingTodos} pending todos`
    }

    const todosWrapper = document.querySelector('.todos-wrapper')
    todosWrapper.innerHTML = ''
    const todoInfoModal = document.querySelector('.todo-info-mod')
    const todoTextArea = document.querySelector('.todo-textarea')
    const todoTimestamp = document.querySelector('.todo-timestamp')
    const notFoundMessage = document.querySelector('.not-found-msg')

    todosWrapper.classList.add('filtered')
    notFoundMessage.classList.remove('show')

    if (todos.length > 0) {
        defaultMessage.classList.remove('show')
        
        todos.forEach((todoDiv) => {
            const todosDiv = document.createElement('div')
            todosDiv.setAttribute('class', 'todos')
            todosDiv.setAttribute('id', todoDiv.id)
            
            const month = todoDiv.id.slice(0, 3)
            const day = todoDiv.id.slice(4, 6)
            const year = todoDiv.id.slice(7, todoDiv.id[-1])
    
            const timestamp = document.createElement('div')
            timestamp.setAttribute('class', 'timestamp')
            timestamp.textContent = `${month} ${day}, ${year}`
    
            const todoWrapper = document.createElement('div')
            todoWrapper.setAttribute('class', 'todo-wrapper')
    
            todosWrapper.appendChild(todosDiv)
            todosDiv.appendChild(timestamp)
            todosDiv.appendChild(todoWrapper)
    
            if (todoDiv.todosArr.length > 0) {
                todoDiv.todosArr.forEach((todoItem) => {
                    const todoEl = document.createElement('div')
                    todoEl.setAttribute('class', 'todo')

                    if (todoItem.completed) {
                        todoEl.classList.add('completed')
                    }   else {
                        todoEl.classList.remove('completed')
                    }
        
                    const todoElIconDiv = document.createElement('div')
                    todoElIconDiv.setAttribute('class', 'todo__icon')
        
                    const todoElIcon = document.createElement('i')
                    todoElIcon.setAttribute('class', 'fa-solid fa-layer-group')
        
                    const todoText = document.createElement('div')
                    todoText.setAttribute('class', 'todo__text')
                    todoText.textContent = todoItem.text
        
                    const todoActions = document.createElement('button')
                    todoActions.setAttribute('class', 'todo__actions')
                    todoActions.setAttribute('title', 'More actions')
        
                    const todoActionsIcon = document.createElement('i')
                    todoActionsIcon.setAttribute('class', 'fa-solid fa-ellipsis-vertical')
        
                    const todoOptionsNav = document.createElement('nav')
                    todoOptionsNav.setAttribute('class', 'todo-options-wrapper mod')
        
                    const todoOptionsList = document.createElement('ul')
                    todoOptionsList.setAttribute('class', 'todo__options')
        
                    const viewDetailsOption = document.createElement('li')
                    viewDetailsOption.setAttribute('class', 'todo__option')
                    viewDetailsOption.textContent = 'View details'

                    viewDetailsOption.addEventListener('click', () => {
                        const infoModalCancelButton = document.querySelector('.info-mod--cancel')
                        const infoModalSaveButton = document.querySelector('.info-mod--save')
                        const todoEditButton = document.querySelector('.todo-edit')

                        overlay.style.background = 'rgba(0, 0, 0, .75)'
                        todoInfoModal.classList.add('show-modal')
                        todoOptionsNav.classList.remove('toggle-todo-options')
                        todoTimestamp.textContent = `Created on ${timestamp.textContent}`
                        todoTextArea.textContent = todoItem.text
                        const disableSave = document.createAttribute('disabled')
                        infoModalSaveButton.setAttributeNode(disableSave)
                        const disableSaveTextArea = disableSave.cloneNode(true)
                        todoTextArea.setAttributeNode(disableSaveTextArea)

                        todoEditButton.addEventListener('click', () => {
                            todoTextArea.removeAttributeNode(disableSaveTextArea)
                            // console.log(todoTextArea.attributes[0].ownerElement.disabled)

                            todoTextArea.addEventListener('input', () => {
                                if (todoTextArea.value !== todoItem.text) {
                                    // console.log(infoModalSaveButton.attributes[0].ownerElement.disabled)

                                    infoModalSaveButton.removeAttributeNode(disableSave)
                                    infoModalSaveButton.addEventListener('click', () => {
                                        todoItem.text = todoTextArea.value
                                        saveTodos(todos)
                                        todoTextArea.textContent = ''
                                        todoInfoModal.classList.remove('show-modal')
                                        overlay.classList.remove('toggle-overlay')
                                        renderTodos(todos)
                                    })
                                }
                            })
                        })

                        infoModalCancelButton.addEventListener('click', () => {
                            todoTextArea.textContent = ''
                            todoInfoModal.classList.remove('show-modal')
                            overlay.classList.remove('toggle-overlay')
                            renderTodos(todos)
                        })
                    })

                    const removeFromListOption = document.createElement('li')
                    removeFromListOption.setAttribute('class', 'todo__option')
                    removeFromListOption.textContent = 'Remove from list'

                    removeFromListOption.addEventListener('click', () => {
                        todos.forEach((todoObj) => {
                            let index = 0
                            todoObj.todosArr.forEach((todosArrItem) => {
                                if (todosArrItem.todoId === todoItem.todoId) {
                                    todoObj.todosArr.splice(index, 1)
                                    saveTodos(todos)
                                    renderTodos(todos)
                                }   else {
                                    index++
                                }
                            })
                        })
                    })

                    const markAsCompleteOption = document.createElement('li')
                    markAsCompleteOption.setAttribute('class', 'todo__option')

                    if (todoItem.completed) {
                        markAsCompleteOption.textContent = 'Mark as incomplete'
                    }   else {
                        markAsCompleteOption.textContent = 'Mark as complete'
                    }

                    markAsCompleteOption.addEventListener('click', () => {
                        const obj = todos.find((todoWrapperObj) => {
                            return todoWrapperObj.id === todoDiv.id
                        })

                        const arrItem = obj.todosArr.find((arrEl) => {
                            return arrEl.todoId === todoItem.todoId
                        })

                        arrItem.completed = !arrItem.completed
                        saveTodos(todos)
                        sortTodosByCompleted(todos)
                        renderTodos(todos)
                        overlay.classList.remove('toggle-overlay')
                    })

                    todoWrapper.appendChild(todoEl)
                    todoEl.appendChild(todoElIconDiv)
                    todoElIconDiv.appendChild(todoElIcon)
                    todoEl.appendChild(todoText)
                    todoEl.appendChild(todoActions)
                    todoActions.appendChild(todoActionsIcon)
                    todoEl.appendChild(todoOptionsNav)
                    todoOptionsNav.appendChild(todoOptionsList)
                    todoOptionsList.appendChild(viewDetailsOption)
                    todoOptionsList.appendChild(removeFromListOption)
                    todoOptionsList.appendChild(markAsCompleteOption)
        
                    todoActions.addEventListener('click', () => {
                        resetOverlayBackground()
                        overlay.classList.add('toggle-overlay')
                        todoOptionsNav.classList.add('toggle-todo-options')
        
                        overlay.addEventListener('click', () => {
                            todoOptionsNav.classList.remove('toggle-todo-options')
                            overlay.classList.remove('toggle-overlay')
                        })
                    })
                })
            }
        })

        sortTodosByCompleted(todos)
    }   else {
        defaultMessage.classList.add('show')
    }
}

// Generate todo wrapper element DOM
const generateTodoWrapperEl = (id) => {
    const todosWrapper = document.querySelector('.todos-wrapper')

    const todosDiv = document.createElement('div')
    todosDiv.setAttribute('class', 'todos')
    todosDiv.setAttribute('id', id)
    
    // const month = currentDate.month
    // const day = currentDate.day
    // const year = currentDate.year

    const month = id.slice(0, 3)
    const day = id.slice(4, 6)
    const year = id.slice(7, id[-1])

    const timestamp = document.createElement('div')
    timestamp.setAttribute('class', 'timestamp')
    timestamp.textContent = `${month} ${day}, ${year}`

    const todoWrapper = document.createElement('div')
    todoWrapper.setAttribute('class', 'todo-wrapper')

    todosWrapper.appendChild(todosDiv)
    todosDiv.appendChild(timestamp)
    todosDiv.appendChild(todoWrapper)
}

// Generate todo element DOM
const generateTodoEl = (todos) => {
    const todoWrapper = document.createElement('div')
    todoWrapper.setAttribute('class', 'todo-wrapper')

    const todoEl = document.createElement('div')
    todoEl.setAttribute('class', 'todo')

    const todoElIconDiv = document.createElement('div')
    todoElIconDiv.setAttribute('class', 'todo__icon')

    const todoElIcon = document.createElement('i')
    todoElIcon.setAttribute('class', 'fa-solid fa-layer-group')

    const todoText = document.createElement('div')
    todoText.setAttribute('class', 'todo__text')
    todoText.textContent = todos[todos.length - 1].todosArr.text

    const todoActions = document.createElement('button')
    todoActions.setAttribute('class', 'todo__actions')
    todoActions.setAttribute('title', 'More actions')

    todoActions.addEventListener('click', () => {
        resetOverlayBackground()
        overlay.classList.add('toggle-overlay')
        todoOptionsNav.classList.add('toggle-todo-options')

        overlay.addEventListener('click', () => {
            todoOptionsNav.classList.remove('toggle-todo-options')
            overlay.classList.remove('toggle-overlay')
        })
    })

    const todoActionsIcon = document.createElement('i')
    todoActionsIcon.setAttribute('class', 'fa-solid fa-ellipsis-vertical')

    const todoOptionsNav = document.createElement('nav')
    todoOptionsNav.setAttribute('class', 'todo-options-wrapper mod')

    const todoOptionsList = document.createElement('ul')
    todoOptionsList.setAttribute('class', 'todo__options')

    const viewDetailsOption = document.createElement('li')
    viewDetailsOption.setAttribute('class', 'todo__option')
    viewDetailsOption.textContent = 'View details'

    const removeFromListOption = document.createElement('li')
    removeFromListOption.setAttribute('class', 'todo__option')
    removeFromListOption.textContent = 'Remove from list'

    const markAsCompleteOption = document.createElement('li')
    markAsCompleteOption.setAttribute('class', 'todo__option')

    if (todos[todos.length - 1].todosArr.completed) {
        markAsCompleteOption.textContent = 'Mark as incomplete'
    }   else {
        markAsCompleteOption.textContent = 'Mark as complete'
    }

    markAsCompleteOption.addEventListener('click', () => {
        const obj = todos.find((todoWrapperObj) => {
            return todoWrapperObj.id === todoDiv.id
        })

        const arrItem = obj.todosArr.find((arrEl) => {
            return arrEl.text === todoItem.text
        })

        arrItem.completed = !arrItem.completed
        saveTodos(todos)
        sortTodosByCompleted(todos)
        renderTodos(todos)
        overlay.classList.remove('toggle-overlay')
    })

    todoWrapper.appendChild(todoEl)
    todoEl.appendChild(todoElIconDiv)
    todoElIconDiv.appendChild(todoElIcon)
    todoEl.appendChild(todoText)
    todoEl.appendChild(todoActions)
    todoActions.appendChild(todoActionsIcon)
    todoEl.appendChild(todoOptionsNav)
    todoOptionsNav.appendChild(todoOptionsList)
    todoOptionsList.appendChild(viewDetailsOption)
    todoOptionsList.appendChild(removeFromListOption)
    todoOptionsList.appendChild(markAsCompleteOption)
}

// Sort todos by completed
const sortTodosByCompleted = (todos) => {
    todos = todos.sort((a, b) => {
        if (a.id > b.id) {
            return -1
        }   else if (b.id > a.id) {
            return 1
        }   else {
            return 0
        }
    })

    saveTodos(todos)

    todos.forEach((todoObj) => {
        todoObj.todosArr = todoObj.todosArr.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1
            }   else if (!b.completed && a.completed) {
                return 1
            }   else {
                return 0
            }
        })
    })
    
    saveTodos(todos)
}

// Render filtered todos
const renderFilteredTodos = (filteredTodos) => {
    const todosWrapper = document.querySelector('.todos-wrapper')
    todosWrapper.innerHTML = ''

    filteredTodos = filteredTodos.sort((a, b) => {
        if (!a.completed && b.completed) {
            return -1
        }   else if (!b.completed && a.completed) {
            return 1
        }   else {
            return 0
        }
    })

    const todoInfoModal = document.querySelector('.todo-info-mod')
    const todoTextArea = document.querySelector('.todo-textarea')
    const todoTimestamp = document.querySelector('.todo-timestamp')

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((filteredTodo) => {
            const todoWrapper = document.createElement('div')
            todoWrapper.setAttribute('class', 'todo-wrapper')
    
            const todoEl = document.createElement('div')
            todoEl.setAttribute('class', 'todo')
    
            if (filteredTodo.completed) {
                todoEl.classList.add('completed')
            }   else {
                todoEl.classList.remove('completed')
            }
    
            const todoElIconDiv = document.createElement('div')
            todoElIconDiv.setAttribute('class', 'todo__icon')
    
            const todoElIcon = document.createElement('i')
            todoElIcon.setAttribute('class', 'fa-solid fa-layer-group')
    
            const todoText = document.createElement('div')
            todoText.setAttribute('class', 'todo__text')
            todoText.textContent = filteredTodo.text
    
            const todoActions = document.createElement('button')
            todoActions.setAttribute('class', 'todo__actions')
            todoActions.setAttribute('title', 'More actions')
    
            todoActions.addEventListener('click', () => {
                resetOverlayBackground()
                overlay.classList.add('toggle-overlay')
                todoOptionsNav.classList.add('toggle-todo-options')
    
                overlay.addEventListener('click', () => {
                    todoOptionsNav.classList.remove('toggle-todo-options')
                    overlay.classList.remove('toggle-overlay')
                })
            })
    
            const todoActionsIcon = document.createElement('i')
            todoActionsIcon.setAttribute('class', 'fa-solid fa-ellipsis-vertical')
    
            const todoOptionsNav = document.createElement('nav')
            todoOptionsNav.setAttribute('class', 'todo-options-wrapper mod')
    
            const todoOptionsList = document.createElement('ul')
            todoOptionsList.setAttribute('class', 'todo__options')
    
            const viewDetailsOption = document.createElement('li')
            viewDetailsOption.setAttribute('class', 'todo__option')
            viewDetailsOption.textContent = 'View details'
    
            viewDetailsOption.addEventListener('click', () => {
                const infoModalCancelButton = document.querySelector('.info-mod--cancel')
                const infoModalSaveButton = document.querySelector('.info-mod--save')
                const todoEditButton = document.querySelector('.todo-edit')
    
                overlay.style.background = 'rgba(0, 0, 0, .75)'
                todoInfoModal.classList.add('show-modal')
                todoOptionsNav.classList.remove('toggle-todo-options')
    
                let todoObject
                todos.forEach((todoObj) => {
                    todoObj.todosArr.forEach((todoArrItem) => {
                        if (todoArrItem.todoId === filteredTodo.id) {
                            todoObject = todoObj
                        }
                    })
                })
    
                todoTimestamp.textContent = `Created on ${todoObject.id}`
    
                todoTextArea.textContent = filteredTodo.text
                const disableSave = document.createAttribute('disabled')
                infoModalSaveButton.setAttributeNode(disableSave)
                const disableSaveTextArea = disableSave.cloneNode(true)
                todoTextArea.setAttributeNode(disableSaveTextArea)
    
                todoEditButton.addEventListener('click', () => {
                    todoTextArea.removeAttributeNode(disableSaveTextArea)
    
                    todoTextArea.addEventListener('input', () => {
                        if (todoTextArea.value !== filteredTodo.text) {
                            infoModalSaveButton.removeAttributeNode(disableSave)
    
                            infoModalSaveButton.addEventListener('click', () => {                        
                                todos.forEach((todoOb) => {
                                    todoOb.todosArr.forEach((arrItm) => {
                                        if (arrItm.todoId === filteredTodo.id) {
                                            arrItm.text = todoTextArea.value
                                            filteredTodo.text = arrItm.text
                                            saveTodos(todos)
                                            todoTextArea.textContent = ''
                                            todoInfoModal.classList.remove('show-modal')
                                            overlay.classList.remove('toggle-overlay')
                                            renderFilteredTodos(filteredTodos)
                                        }
                                    })
                                })
                            })
                        }
                    })
                })
    
                infoModalCancelButton.addEventListener('click', () => {
                    todoTextArea.textContent = ''
                    todoInfoModal.classList.remove('show-modal')
                    overlay.classList.remove('toggle-overlay')
                    renderFilteredTodos(filteredTodos)
                })
            })
    
            const removeFromListOption = document.createElement('li')
            removeFromListOption.setAttribute('class', 'todo__option')
            removeFromListOption.textContent = 'Remove from list'
    
            removeFromListOption.addEventListener('click', () => {
                todos.forEach((todoObj) => {
                    let index = 0
                    todoObj.todosArr.forEach((todosArrItem) => {
                        if (todosArrItem.todoId === filteredTodo.id) {
                            todoObj.todosArr.splice(index, 1)
                            saveTodos(todos)
                            const filteredIndex = filteredTodos.findIndex((item) => {
                                return item.id === filteredTodo.id
                            })
                            filteredTodos.splice(filteredIndex, 1)
                            todoOptionsNav.classList.remove('toggle-todo-options')
                            overlay.classList.remove('toggle-overlay')
                            renderFilteredTodos(filteredTodos)
                        }   else {
                            index++
                        }
                    })
                })
            })
    
            const markAsCompleteOption = document.createElement('li')
            markAsCompleteOption.setAttribute('class', 'todo__option')
    
            if (filteredTodo.completed) {
                markAsCompleteOption.textContent = 'Mark as incomplete'
            }   else {
                markAsCompleteOption.textContent = 'Mark as complete'
            }
    
            markAsCompleteOption.addEventListener('click', () => {
                todos.forEach((todoObj) => {
                    todoObj.todosArr.forEach((item) => {
                        if (item.todoId === filteredTodo.id) {
                            filteredTodo.completed = !filteredTodo.completed
                            item.completed = filteredTodo.completed
                            saveTodos(todos)
                        }
                    })
                })
    
                todoOptionsNav.classList.remove('toggle-todo-options')
                overlay.classList.remove('toggle-overlay')
                renderFilteredTodos(filteredTodos)
            })
    
            todosWrapper.appendChild(todoWrapper)
            todoWrapper.appendChild(todoEl)
            todoEl.appendChild(todoElIconDiv)
            todoElIconDiv.appendChild(todoElIcon)
            todoEl.appendChild(todoText)
            todoEl.appendChild(todoActions)
            todoActions.appendChild(todoActionsIcon)
            todoEl.appendChild(todoOptionsNav)
            todoOptionsNav.appendChild(todoOptionsList)
            todoOptionsList.appendChild(viewDetailsOption)
            todoOptionsList.appendChild(removeFromListOption)
            todoOptionsList.appendChild(markAsCompleteOption)
        })
    }   else {
        todosWrapper.classList.remove('filtered')
        notFoundMessage.classList.add('show')
    }
}