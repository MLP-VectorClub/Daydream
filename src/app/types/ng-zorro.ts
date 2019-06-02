import { Nullable } from 'app/types/common';
import { BreadcrumbOption } from 'ng-zorro-antd/breadcrumb/nz-breadcrumb.component';

export interface LaxBreadcrumbOption {
  label: Nullable<BreadcrumbOption['label']>;
  url: Nullable<BreadcrumbOption['url']>;
  params?: BreadcrumbOption['params'];
  current?: boolean;
}
