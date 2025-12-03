import json

target_frame_id = "1:180"

try:
    with open('figma_tree.json', 'r') as f:
        data = json.load(f)

    def find_node_by_id(node, target_id):
        # Check if node is a dict
        if not isinstance(node, dict):
            return None
            
        if node.get('id') == target_id:
            return node
        
        if 'children' in node:
            for child in node['children']:
                result = find_node_by_id(child, target_id)
                if result:
                    return result
        
        # Handle root level 'nodes' dictionary
        if 'nodes' in node:
             for key, value in node['nodes'].items():
                 if 'document' in value:
                     result = find_node_by_id(value['document'], target_id)
                     if result:
                         return result
        return None

    def find_images(node):
        if not isinstance(node, dict):
            return

        if 'fills' in node:
            for fill in node['fills']:
                if fill.get('type') == 'IMAGE':
                    print(f"Found Image Node! ID: {node.get('id')}, Name: {node.get('name')}, Type: {node.get('type')}")
        
        if 'children' in node:
            for child in node['children']:
                find_images(child)

    frame = find_node_by_id(data, target_frame_id)
    if frame:
        print(f"Found Frame: {frame.get('name')} ({frame.get('id')})")
        find_images(frame)
    else:
        print("Frame not found")

except Exception as e:
    print(f"Error: {e}")
