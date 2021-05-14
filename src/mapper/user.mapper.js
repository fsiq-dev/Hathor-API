const KindListUser = (kind) => {
    switch (kind) {
        case "admin":
            return 1;
        default:
            break;
    }
}

const toUserDTO = (model) => {
    const { id, email, kind, name, companyName } = model;
    return {
        id,
        email,
        name: name ? name : companyName,
        kindUser: KindListUser(kind)
    }
}

module.exports = { 
    toUserDTO
}