import { TreeItem, TreeView } from '@mui/lab';
import { Icon } from '@mui/material';
import styles from './rich-object-tree.module.scss';

export interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}
/* eslint-disable-next-line */
export interface RichObjectTreeProps {
  data:RenderTree[],
  displayLabel?: (row:any)=>any,
  onNodeSelect?:(node:any)=>void
}

export function RichObjectTree({data,displayLabel,onNodeSelect}: RichObjectTreeProps) {
  
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} 
      nodeId={nodes.id} label={  displayLabel ? displayLabel(nodes): nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView          
      onNodeSelect={ ( event:any, node:any)=>{
           onNodeSelect && onNodeSelect(node);
      } }
      defaultExpandIcon={<Icon>chevron_right</Icon>}
      defaultCollapseIcon={<Icon>expand_more</Icon> }
      aria-label="rich object"
      // defaultCollapseIcon={<ExpandMoreIcon />}
      expanded={ (data).map( i=>i.id) }
      // defaultExpandIcon={<ChevronRightIcon />}
      sx={{  flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    > {data.map(ri=> renderTree(ri) )}
    </TreeView>
  );
}

export default RichObjectTree;
