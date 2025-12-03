import json

try:
    with open('figma_tree.json', 'r') as f:
        data = json.load(f)

    def find_frames(node):
        if node.get('type') == 'FRAME' or node.get('type') == 'SECTION':
            print(f"ID: {node['id']}, Name: {node['name']}, Type: {node['type']}")
        
        if 'children' in node:
            for child in node['children']:
                find_frames(child)
        elif 'nodes' in node: # Handle root structure
             for key, value in node['nodes'].items():
                 if 'document' in value:
                     find_frames(value['document'])

    find_frames(data)

except Exception as e:
    print(f"Error: {e}")
