class Test {
    constructor(user) {
        this.user = user;
    }

    say() {
        return 'Hello '+ this.user.getName();
    }

    getUser() {
        return this.user;
    }
}
