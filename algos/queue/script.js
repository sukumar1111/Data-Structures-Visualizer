// Variable Declaration
const enqueue = document.querySelector(".enqueue");
const dequeue = document.querySelector(".dequeue");
const reset = document.querySelector(".reset");
const bucket = document.querySelector(".main-queue-bucket");
const input = document.querySelector(".text");
const message = document.querySelector(".message");
const messageBox = document.querySelector(".message-box");
const box = document.querySelectorAll(".box");
const queue = [];

// Highlight elements for Python code
const pythonEnqueueCode = document.querySelector(".python-enqueue-code");
const pythonDequeueCode = document.querySelector(".python-dequeue-code");
const pythonFrontCode = document.querySelector(".python-front-code");

// Disable all buttons
const buttonDisable = () => {
    enqueue.disabled = true;
    enqueue.classList.add("disable-button");
    dequeue.disabled = true;
    dequeue.classList.add("disable-button");
    reset.disabled = true;
    reset.classList.add("disable-button");
    input.disabled = true;
};

// Enable all buttons
const buttonEnable = () => {
    enqueue.disabled = false;
    enqueue.classList.remove("disable-button");
    dequeue.disabled = false;
    dequeue.classList.remove("disable-button");
    reset.disabled = false;
    reset.classList.remove("disable-button");
    input.disabled = false;
};

// Function to highlight the Python code
const highlightPythonCode = (codeElement) => {
    codeElement.classList.add("highlight-code");
    setTimeout(() => {
        codeElement.classList.remove("highlight-code");
    }, 1500);
};

enqueue.addEventListener("click", () => {
    if (input.value == "") {
        message.innerHTML = "Please Enter a value.";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    if (queue.length === 5) {
        input.value = "";
        message.innerHTML = "Queue Overflow";
        messageBox.classList.add("error-message");
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    const itemValue = input.value;
    queue.push(itemValue);

    const element = document.createElement("div");
    element.classList.add("ele");
    element.innerText = queue[queue.length - 1];
    bucket.appendChild(element);

    box[0].innerHTML = queue[0]; // Front element
    box[1].innerHTML = itemValue; // Last added element
    input.value = "";

    element.classList.add("ele-add");
    buttonDisable();

    // Highlight Python enqueue code
    highlightPythonCode(pythonEnqueueCode);

    setTimeout(() => {
        element.classList.remove("ele-add");
        message.innerHTML = `Item ${itemValue} is Enqueued.`;
        box[3].innerHTML = queue.length; // Queue size
        buttonEnable();
    }, 1500);
});

// When the dequeue button is clicked
dequeue.addEventListener("click", () => {
    if (queue.length === 0) {
        messageBox.classList.add("error-message");
        message.innerHTML = "Queue Underflow";
        setTimeout(() => {
            messageBox.classList.remove("error-message");
        }, 1200);
        return;
    }

    const itemValue = queue.shift(); // Dequeue operation
    box[2].innerHTML = itemValue; // Last removed item

    bucket.firstElementChild.classList.add("ele-remove");
    buttonDisable();

    // Highlight Python dequeue code
    highlightPythonCode(pythonDequeueCode);

    setTimeout(() => {
        bucket.removeChild(bucket.firstElementChild);
        box[0].innerHTML = queue.length > 0 ? queue[0] : ""; // Front element
        message.innerHTML = `Item ${itemValue} is Dequeued.`;
        box[3].innerHTML = queue.length; // Queue size
        buttonEnable();
    }, 1500);
});

// When the reset button is clicked
reset.addEventListener("click", () => {
    while (queue.length > 0) {
        queue.shift(); // Clear the queue
    }

    box[0].innerHTML = ""; // Front element
    box[1].innerHTML = ""; // Last added element
    box[2].innerHTML = ""; // Last removed element
    message.innerHTML = "";

    while (bucket.firstChild) {
        bucket.removeChild(bucket.firstChild);
    }

    box[3].innerHTML = "0"; // Queue size
});
