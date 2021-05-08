class Category {
    // #id = 0;
    constructor(dbRes) {
        this._id = dbRes.id;
        this.mycategory = dbRes.mycategory;
        this.users_id = dbRes.users_id;
        this.phone_number = dbRes.phone_number;
        this.gender = dbRes.gender;
        this.country = dbRes.country;
    }

    getInfo(idFlag = false) {
        const responseData = {
            mycategory: this.mycategory,
            users_id: this.users_id,
            phone_number: this.phone_number,
            gender: this.gender,
            country: this.country
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