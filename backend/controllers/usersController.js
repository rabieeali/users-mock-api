    const data = {
    users:  require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}


const getUsers = (req, res) => {
  res.status(200).json(data.users);
};

const getSingleUser = (req , res) => {
    const user = data.users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(400).json({ "message": `user ID ${req.params.id} not found` });
    res.json(user);
}

const createNewUser = (req , res) => {
    const { username , password } = req.body;

    // check for duplicate usernames in the db
    const duplicate = data.users.find(person => person.username === username);
    if (duplicate) return res.sendStatus(409); //Conflict 

    

    const newUser = {
        id: data.users?.length ? data.users[data.users.length - 1].id + 1 : 1,
        username,
        password
    }

    if (!newUser.username || !newUser.password) return res.status(400).json({ 'message': 'username and password are required.' });
    data.setUsers([...data.users, newUser]);
    res.status(201).json(data.users);
}

const editUser = (req, res) => {
    const { id } = req.params;
    const { username , password } = req.body;

    const user = data.users.find(u => u.id === parseInt(id));
    if (!user) return res.status(400).json({ "message": `user ID ${id} not found` });
    if (username) user.username = username;
    if (password) user.password = password;
    const filteredArray = data.users.filter(u => u.id !== parseInt(id));
    const unsortedArray = [...filteredArray, user];
    data.setUsers(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.users);
}

const deleteUser = (req , res) => {
    const { id } = req.params;

    const user = data.users.find(u => u.id === parseInt(id));
    if (!user) return res.status(400).json({ "message": `user ID ${id} not found` });
    const filteredArray = data.users.filter(u => u.id !== parseInt(id));
    data.setUsers([...filteredArray]);
    res.json(data.users);
}

module.exports = { getUsers, getSingleUser, createNewUser, editUser ,deleteUser};
