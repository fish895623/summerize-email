messenger.messageDisplay.getDisplayedMessage().then((message) => {
  if (message) {
    console.log("Subject:", message.subject);
    console.log("From:", message.author);
    console.log("Date:", message.date);
    console.log("Body:", message.body);
    messenger.messages.get(message.id).then((fullMessage) => {
      console.log("Full Message:", fullMessage.body);
      const body =
        fullMessage.body + " \n\n Please summerize it in 10 sentences";
      fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b-instruct-q8_0",
          prompt: body,
          stream: false,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  } else {
    console.log("No message is currently displayed.");
  }
});
