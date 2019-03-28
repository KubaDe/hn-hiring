import he from 'he';

export interface Job {
  text: string;
  headLine: string;
  tags: string[];
}

class JobParser {
  public parse(text: string): Job {
    const headLineMatch = text.match(/<p>(.*?)<\/p>/);
    let headLine: string = (headLineMatch && headLineMatch[1]) || '';
    headLine = he.decode(headLine).replace(/<\/?[^>]+(>|$)/g, '');
    const tags = headLine.split('|').map(tag => tag.trimLeft().trimRight());
    return {
      text,
      headLine,
      tags,
    };
  }
}

export default new JobParser();
