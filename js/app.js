const bodyEl = document.body
const searchWrapper = document.querySelector('.search-wrapper')
const searchBox = document.querySelector('#searchbox')
const closeSearch = document.querySelector('.search--mob--close')
const clearSearch = document.querySelector('.search__clear')
const logo = document.querySelector('.logo')
const searchButtonMob = document.querySelector('.search__searchbtn--mob')
const menu = document.querySelector('.menu--lg')
const menuButton = document.querySelector('.menu-icon')
const menuWrapper = document.querySelector('.menu-wrapper')
const overlay = document.querySelector('.overlay')

// const todoActionsButton = document.querySelector('.todo__actions')
// const todoOptions = document.querySelector('.todo-options-wrapper')

const themeCheckbox = document.querySelector('#themeChkbx')
const themeOptionIcon = document.querySelector('#toggle-dark-mode-option i.fa-solid')
const themeOptionText = document.querySelector('#toggle-dark-mode-option .item-desc')
const newTodoButton = document.querySelector('#new-todo-btn')
const newTodoFormWrapper = document.querySelector('.new-todo-form-wrapper')
const newTodoFormCloseButton = document.querySelector('#new-todo-form-close')
const newTodoForm = document.querySelector('#new-todo-form')
const newTodoFormInput = document.querySelector('.new-todo-input')

const summaryMessage = document.querySelector('.summary__msg')
const defaultMessage = document.querySelector('.default-msg')
const notFoundMessage = document.querySelector('.not-found-msg')

const aboutAppModal = document.querySelector('#about-app-modal')
const modalCloseButton = document.querySelector('.modal-close')
const aboutAppOption = document.querySelector('#about-app-option')
const darkModeOption = document.querySelector('#toggle-dark-mode-option')
const removeCompletedOption = document.querySelector('#remove-completed-option')
const removeCompletedConfModal = document.querySelector('#conf-modal-remove-all')
const confModalCancelButton = document.querySelector('.conf-btn.conf-btn--cancel')
const confModalConfrmButton = document.querySelector('.conf-btn.conf-btn--confirm')

const todoInfoModal = document.querySelector('.todo-info-mod')
const todoTextArea = document.querySelector('.todo-textarea')

let todos = getSavedTodos()
let filters = {
    searchText: ''
}

// Apply saved theme
themeCheckbox.checked = getSavedTheme()
setTheme(themeCheckbox.checked)

// Render todos on page load
renderTodos(todos)

// Search todos
searchBox.addEventListener('input', (e) => {
    filters.searchText = e.target.value

    if (e.target.value.length > 0) {
        clearSearch.classList.add('clear-search')
        clearSearch.addEventListener('click', () => {
            searchBox.value = ''
            clearSearch.classList.remove('clear-search')
            filters.searchText = searchBox.value
            renderTodos(todos)
        })
    }   else {
        clearSearch.classList.remove('clear-search')
    }
})

// Filter todos
searchBox.addEventListener('input', (e) => {
    filters.searchText = e.target.value
    const todosWrapper = document.querySelector('.todos-wrapper')

    let filteredTodos = []
    if (e.target.value.length > 0) {
        todos.forEach((todoObj) => {
            todoObj.todosArr.forEach((todo) => {
                if (todo.text.toLowerCase().includes(filters.searchText.toLowerCase())) {
                    // console.log(todo.todoId)

                    filteredTodos.push({
                        text: todo.text,
                        completed: todo.completed,
                        id: todo.todoId
                    })
                }
            })
        })

        todosWrapper.innerHTML = ''

        if (filteredTodos.length > 0) {
            todosWrapper.classList.add('filtered')
            notFoundMessage.classList.remove('show')
            renderFilteredTodos(filteredTodos)
        }   else {
            todosWrapper.classList.remove('filtered')
            notFoundMessage.classList.add('show')
        }

        summaryMessage.innerHTML = ''
        if (filteredTodos.length === 1) {
            summaryMessage.textContent = `${filteredTodos.length} matching todo`
        }   else {
            summaryMessage.textContent = `${filteredTodos.length} matching todos`
        }
    }   else {
        todosWrapper.classList.remove('filtered')
        renderTodos(todos)
    }
})

// Toggle mobile search
searchButtonMob.addEventListener('click', () => {
    logo.classList.add('full-screen-search')
    searchWrapper.classList.add('full-screen-search')
    searchBox.focus()
    closeSearch.addEventListener('click', () => {
        logo.classList.remove('full-screen-search')
        searchWrapper.classList.remove('full-screen-search')
        // searchBox.value = ''
        // filters.searchText = ''
        // renderTodos(todos)
    })
})

// Toggle mobile menu
menuButton.addEventListener('click', () => {
    menuWrapper.classList.toggle('toggle-menu')
    menu.classList.toggle('toggle-menu')
})

// Toggle overlay
overlay.addEventListener('click', () => {
    let openModals = document.querySelectorAll('.modal.show-modal')
    openModals.forEach((modal) => {
        modal.classList.remove('show-modal')
    })
    overlay.classList.remove('toggle-overlay')
})

// Toggle dark mode
darkModeOption.addEventListener('click', () => {
    themeCheckbox.checked = !themeCheckbox.checked
    setTheme(themeCheckbox.checked)
})

// Toggle new todos form
newTodoButton.addEventListener('click', () => {
    newTodoFormWrapper.classList.add('show-new-todo-form')
    defaultMessage.classList.remove('show')
    newTodoFormInput.focus()
    newTodoFormCloseButton.addEventListener('click', () => {
        newTodoFormWrapper.classList.remove('show-new-todo-form')

        if (todos.length === 0) {
            defaultMessage.classList.add('show')
        }
    })
})

// Add new todos
newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const currentDate = getCurrentDate()

    let todosId = `${currentDate.month}-${currentDate.day}-${currentDate.year}`
    let todosEl = document.querySelector(`#${todosId}`)

    if (todosEl === null) {
        todos.push({
            id: todosId,
            todosArr: []
        })

        todosEl = todos.find((todo) => {
            return todo.id === todosId
        })
        
        todosEl.todosArr.push({
            todoId: uuidv4(),
            text: e.target.elements.todoTextInput.value,
            completed: false
        })

        // todos[todos.length - 1].todosArr.push({
        //     text: e.target.elements.todoTextInput.value,
        //     completed: false
        // })

        const todosWrapper = document.querySelector('.todos-wrapper')
        todosWrapper.innerHTML = ''

        // Generate todo wrapper
        generateTodoWrapperEl(todosId)

        // Generate todo element
        generateTodoEl(todos)

        sortTodosByCompleted(todos)
        renderTodos(todos)
    }   else {
        todosEl = todos.find((todo) => {
            return todo.id === todosId
        })
        
        todosEl.todosArr.push({
            todoId: uuidv4(),
            text: e.target.elements.todoTextInput.value,
            completed: false
        })

        saveTodos(todos)
        sortTodosByCompleted(todos)
        renderTodos(todos)
    }

    e.target.elements.todoTextInput.value = ''
    newTodoFormWrapper.classList.remove('show-new-todo-form')
})

// Toggle about app modal
aboutAppOption.addEventListener('click', () => {
    overlay.classList.add('toggle-overlay')
    overlay.style.background = 'rgba(0, 0, 0, .75)'
    aboutAppModal.classList.add('show-modal')

    modalCloseButton.addEventListener('click', () => {
        aboutAppModal.classList.remove('show-modal')
        overlay.classList.remove('toggle-overlay')
    })
})

// Remove completed todos
removeCompletedOption.addEventListener('click', () => {
    overlay.classList.add('toggle-overlay')
    overlay.style.background = 'rgba(0, 0, 0, .75)'
    removeCompletedConfModal.classList.add('show-modal')

    confModalCancelButton.addEventListener('click', () => {
        const openConfModals = document.querySelectorAll('.conf-mod.show-modal')
        openConfModals.forEach((openConfModal) => {
            openConfModal.classList.remove('show-modal')
        })
        overlay.classList.remove('toggle-overlay')
    })

    confModalConfrmButton.addEventListener('click', () => {
        todos.forEach((todoObject) => {
            if (todoObject.todosArr.length > 0) {
                todoObject.todosArr = todoObject.todosArr.filter((todo) => {
                    return !todo.completed
                })
                saveTodos(todos)
            }
        })

        document.querySelector('.conf-mod.show-modal').classList.remove('show-modal')
        overlay.classList.remove('toggle-overlay')

        renderTodos(todos)
    })
})