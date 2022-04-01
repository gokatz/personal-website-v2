import { useEffect } from 'preact/hooks';
import siteData from '../data';

const Comments = (props) => {

  useEffect(() => {
    if (window.DISQUS) {
      return;
    }

    const { slug = '', title } = props;
    const { permalink, disqusSiteName } = siteData;
    const url = permalink + slug;
    
    window.disqus_config = function () {
      this.page.url = url;  // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = title; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      this.page.title = title;
      this.page.shortname = disqusSiteName;
    };

    (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://gokatz.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
  }, []);

  return (
    <div id="disqus_thread"></div>
  );
}

export default Comments;