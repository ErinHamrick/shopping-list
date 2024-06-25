const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');

function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;
	// validate input
	if (newItem === '') {
		alert('Please add an item');
		return;
	}
	// create list item
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));

	const button = createButton('remove-item btn-link text-red');
	li.appendChild(button);

	itemList.appendChild(li);
	checkUI();

	itemInput.value = '';
}

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-solid fa-xmark');
	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

function removeItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		if (confirm('Are you sure?')) {
			const li = e.target.parentElement.parentElement;
			li.remove();
		}
	}
    checkUI();
}

function clearItems() {
	if (confirm('Are you sure?')) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
	}
    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();

        if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
    }) 
}

function checkUI() {
	const items = itemList.querySelectorAll('li');
	if (items.length === 0) {
		clearBtn.style.display = 'none';
		filter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		filter.style.display = 'block';
	}
}

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
filter.addEventListener('input', filterItems)

checkUI();
