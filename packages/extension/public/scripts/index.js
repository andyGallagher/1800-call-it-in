console.info("1-800-call-it-in: content script loaded");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "requestPageContent") {
        sendResponse(document.body.innerText);
    }
});
