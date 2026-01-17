import kagglehub

# Download latest version
path = kagglehub.dataset_download("ananta/student-performance-dataset")

print("Path to dataset files:", path)