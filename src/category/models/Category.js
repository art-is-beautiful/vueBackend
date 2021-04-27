class Category {
    // #id = 0;
    constructor(dbRes) {
        this._id = dbRes.id;
        this.mycategory = dbRes.mycategory;
        this.users_id = dbRes.users_id;
    }

    getInfo(idFlag = false) {
        const responseData = {
            mycategory: this.mycategory,
            users_id: this.users_id
        };
        if (idFlag) {
            responseData.id = this._id;
        }
        return responseData;
    }

    getId() {
        return this._id;
    }
}

module.exports = { Category };