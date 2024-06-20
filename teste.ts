const dto = {
    email: "teste@gmail.com"
}

const other = { ...dto }
other.email = "other@gmail.com"

console.log(dto)
console.log(other)