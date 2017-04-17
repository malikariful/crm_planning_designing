'use strict';

export default class EmployerController {
    /*@ngInject*/
    constructor($scope) {
        this.$scope = $scope;
        this.firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
        this.lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
        this.dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
        this.id = 0;
        this.rowCollection = [];
    }

    onInit() {
        for (; this.id < 5; this.id++) {
            this.rowCollection.push(this.generateRandomItem(this.id));
        }
    };

    generateRandomItem(id) {
        var firstname = this.firstnames[Math.floor(Math.random() * 3)];
        var lastname = this.lastnames[Math.floor(Math.random() * 3)];
        var birthdate = this.dates[Math.floor(Math.random() * 3)];
        var balance = Math.floor(Math.random() * 2000);

        return {
            id: id,
            firstName: firstname,
            lastName: lastname,
            birthDate: new Date(birthdate),
            balance: balance
        }
    }

    addRandomItem = function addRandomItem() {
        this.rowCollection.push(this.generateRandomItem(this.id));
        this.id++;
    };

    removeItem = function removeItem(row) {
        var index = this.rowCollection.indexOf(row);
        if (index !== -1) {
            this.rowCollection.splice(index, 1);
        }
    }

}
