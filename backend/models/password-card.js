const fs = require('fs/promises');
const { encrypt, decrypt} = require('../lib/encryption');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

class PasswordCard {

  static #data = [];

  constructor(id, url, name, username, password) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.username = username;
    this.password = password;
  }

  /**
   * Fetches the Password Cards from the data file
   *
   * @static
   * @memberof PasswordCard
   */
  static async #getData() {
    if (!PasswordCard.#data.length) {
      let rawdata = await fs.readFile('./data/password-cards.json');
      PasswordCard.#data = JSON.parse(rawdata.toString('utf-8') || '[]');
    }

    return PasswordCard.#data;
  }

  /**
   * Gets all the Password Cards stored
   *
   * @static
   * @return {PasswordCard[]} An array of Password Cards
   * @memberof PasswordCard
   */
  static async all() {
    await PasswordCard.#getData();

    return PasswordCard.#data.map(e => new PasswordCard(e.id, e.url, e.name, e.username, decrypt(e.password)));
  }

  /**
   * Finds a Password Card matching with the received ID
   *
   * @static
   * @param {string} id The id of the Password Card to get
   * @return {PasswordCard} The Password Card matching with the id
   * @memberof PasswordCard
   */
  static async find(id) {
    await PasswordCard.#getData();
    let card = PasswordCard.#data.find(c => c.id === id)

    if (!card) return null;

    return new PasswordCard(card.id, card.url, card.name, card.username, decrypt(card.password));
  }

  /**
   * Gets all the Password Cards stored that match with the received name
   *
   * @static
   * @param {string} name The text used to filter the list
   * @return {PasswordCard[]} An array of Password Cards
   * @memberof PasswordCard
   */
  static async filterByName(name) {
    await PasswordCard.#getData();

    name = name.toLowerCase();
    return PasswordCard.#data.filter(c => c.name.toLowerCase().includes(name))
                             .map(e => new PasswordCard(e.id, e.url, e.name, e.username, decrypt(e.password)));
  }

  /**
   * Creates or updates a Password Card
   *
   * @return {PasswordCard} The data saved to the file
   * @memberof PasswordCard
   */
  async save() {
    await PasswordCard.#getData();
    if (this.id) {
      let existingCard = PasswordCard.#data.find(c => c.id == this.id);
      if (!existingCard) throw new Error('Not found');

      existingCard.name = this.name;
      existingCard.username = this.username
      existingCard.password = encrypt(this.password)
    } else {
      this.id = uuidv4()
      PasswordCard.#data.push({
        id: this.id,
        url: this.url,
        name: this.name,
        username: this.username,
        password: encrypt(this.password)
      });
    }
    await fs.writeFile('./data/password-cards.json', JSON.stringify(PasswordCard.#data), { flag: 'w+' });

    return this;
  }

  /**
   * Removes a Password Card
   *
   * @memberof PasswordCard
   */
  async remove() {
    if (!this.id) throw new Error('Not found');

    await PasswordCard.#getData();
    let existingCardIdx = PasswordCard.#data.findIndex(c => c.id == this.id);
    if (existingCardIdx < 0) throw new Error('Not found');

    PasswordCard.#data.splice(existingCardIdx, 1);
    await fs.writeFile('./data/password-cards.json', JSON.stringify(PasswordCard.#data), { flag: 'w+' });
  }

}

module.exports = PasswordCard;
