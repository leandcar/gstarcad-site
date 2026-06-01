import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { SeoService } from '../../core/seo.service';
import { articleLd, breadcrumbLd } from '../../core/structured-data';
import { BlogPost as Post } from '../../core/models';
import { CtaSection } from '../../shared/cta-section/cta-section';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe, CtaSection],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
})
export class BlogPost implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private content = inject(ContentService);
  private seo = inject(SeoService);

  post?: Post;
  related: Post[] = [];

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.post = this.content.blogBySlug(slug);
    if (!this.post) {
      this.router.navigateByUrl('/blog');
      return;
    }
    const p = this.post;
    this.related = this.content.blogPosts.filter((b) => b.slug !== p.slug).slice(0, 2);
    this.seo.apply({
      title: p.title,
      description: p.description,
      path: `/blog/${p.slug}`,
      type: 'article',
      jsonLd: [
        articleLd(p),
        breadcrumbLd([
          { name: 'Início', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: p.title, url: `/blog/${p.slug}` },
        ]),
      ],
    });
  }
}
