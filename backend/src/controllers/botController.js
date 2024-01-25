

export let readBot = async (req, res) => {
  res.sendFile(__dirname + "/index.html");
};
