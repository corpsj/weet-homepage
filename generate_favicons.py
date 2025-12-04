from PIL import Image
import os

def generate_favicons(source_path, output_dir):
    if not os.path.exists(source_path):
        print(f"Error: Source file not found at {source_path}")
        return

    try:
        img = Image.open(source_path)
        sizes = [16, 32, 48, 180, 192]
        
        # Ensure output directory exists
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        for size in sizes:
            resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
            
            if size == 16:
                output_filename = "favicon.ico"
                # For ico, we can save directly or as png then rename, but PIL supports saving as ICO
                resized_img.save(os.path.join(output_dir, output_filename), format='ICO')
            elif size == 180:
                output_filename = "apple-touch-icon.png"
                resized_img.save(os.path.join(output_dir, output_filename), format='PNG')
            elif size == 192:
                output_filename = "android-chrome-192x192.png"
                resized_img.save(os.path.join(output_dir, output_filename), format='PNG')
            else:
                output_filename = f"favicon-{size}x{size}.png"
                resized_img.save(os.path.join(output_dir, output_filename), format='PNG')
            
            print(f"Generated {output_filename}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    source = "/Users/zoopark/Library/CloudStorage/SynologyDrive-dev/weet-homepage/public/images/favicon_source.png"
    output = "/Users/zoopark/Library/CloudStorage/SynologyDrive-dev/weet-homepage/public"
    generate_favicons(source, output)
