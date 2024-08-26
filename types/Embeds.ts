import React from "react";
export type EmbedCategories = 'gsites' | 'slides' | 'docs' | 'youtube' | 'drive' | 'other';

export abstract class Embed {
  link: string;
  abstract source: EmbedCategories;
  abstract getEmbedLink(): string;

  constructor(link: string) {
    this.link = link;
  }
}

export namespace CustomEmbeds {

  export class Drive extends Embed {
    source = 'drive' as EmbedCategories;
  
    constructor(link: string) {
      super(link);
      const videoId = this.getId();
  
      if (!videoId) {
        throw new TypeError('Unsupported Video');
      }
    }
  
    getId(): string | null {
      const idx = this.link.lastIndexOf('/d/');
      const idx2 = this.link.indexOf('/view');
      return this.link.substring(idx + 3, idx2);
    }
  
    getEmbedLink(): string {
      return `https://drive.google.com/file/d/${this.getId()}/preview`;
    }
  }

  export class YouTube extends Embed {
    source = 'youtube' as EmbedCategories;
  
    constructor(link: string) {
      super(link);
      const videoId = this.getId();
  
      if (!videoId) {
        throw new TypeError('Unsupported Video');
      }
    }
  
    getId(): string | null {
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  
      const match = this.link.match(youtubeRegex);
      return match ? match[1] : null;
    }
  
    getEmbedLink(): string {
      return `https://www.youtube.com/embed/${this.getId()}`;
    }
  }
  
  export class GSite extends Embed {
    public source = 'gsites' as EmbedCategories;
    constructor(link: string) {
      super(link);
    }



    getEmbedLink(): string {
      return 'NONE';
    }
  }

  export class Slideshow extends Embed {
    public source = 'gslides' as EmbedCategories;
    constructor(link: string) {
      super(link);
    }

    getId(): string {
      const googleSlidesRegex = /\/presentation\/d\/([a-zA-Z0-9_-]+)/;
      const match = this.link.match(googleSlidesRegex);
  
      return match![1];
    }

    getEmbedLink(): string {
      return `https://docs.google.com/presentation/d/${this.getId()}/preview`;
    }
  }

  export class Document extends Embed {
    public source = 'docs' as EmbedCategories; // For example, this class supports Google Docs documents
  
    constructor(link: string) {
      super(link);
    }
  
    getEmbedLink(): string {
      return `https://docs.google.com/document/d/${this.getId()}/preview`;
    }
  
    getId(): string {
      const googleDocsRegex = /(?:https?:\/\/)?(?:docs\.google\.com)\/(?:document|spreadsheets|presentation)\/d\/([^\/?]+)/;
      const match = this.link.match(googleDocsRegex);
      return match![1];
    }
  }

  export class Other extends Embed {
    public source = 'other' as EmbedCategories;
    constructor(link: string) {
      super(link);
    }


    getEmbedLink(): string {
      return 'NONE';
    }
  }
  
}