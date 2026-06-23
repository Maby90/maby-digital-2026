import os
from pypdf import PdfReader

dir_path = "/Users/mabyprochilo/Desktop/Newsletter"
files = [f for f in os.listdir(dir_path) if f.endswith('.pdf')]
combined_text = ""

for i, f in enumerate(files[:3]):
    try:
        reader = PdfReader(os.path.join(dir_path, f))
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        combined_text += f"\n--- NEWSLETTER {i+1} ---\n{text}\n-----------------------\n"
    except Exception as e:
        print(f"Error reading {f}: {e}")

with open("extracted_newsletters.txt", "w") as out:
    out.write(combined_text)
print("Done extracting text.")
