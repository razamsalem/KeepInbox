import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { noteData } from './noteData.service.js'



const NOTE_KEY = 'noteDB'

var demoNotes = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112255,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ff0000'
        },
        info: {
            txt: 'Here we go!'
        }
    },
    {
        id: 'n103',
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
}

function query() {
    return storageService.query(NOTE_KEY)
    .then((notes) => {


        return notes
    })
}

function get(bookId) {
    return storageService.get(NOTE_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(NOTE_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(NOTE_KEY, book)
    } else {
        return storageService.post(NOTE_KEY, book)
    }
}

function getEmptyNote() {
    return {
        createdAt: null,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Empty note'
        },
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', minPages: '' }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = demoNotes
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}