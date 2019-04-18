import Adapter from './Adapter'

export default class MagazineArticleAdapter extends Adapter {
  static getType () {
    return 'conference-paper'
  }

  static getFields () {
    return [
      'putCode',
      'title',
      'bibtex',
      'author',
      'year',
      'month'
    ]
  }
}
