import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

interface LinkInfo {
  name: string;
  link: string;
}

type Props = {
  orgLink: LinkInfo,
  repoLink: LinkInfo
};

const BreadCrumbs: React.FC<Props> = ({ orgLink, repoLink }) => {
  return (
    <Breadcrumb>
      <BreadcrumbItem href={orgLink.link} target="_blank">
        {orgLink.name}
      </BreadcrumbItem>

      <BreadcrumbItem className="link" href={repoLink.link} target="_blank">
        {repoLink.name}
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
