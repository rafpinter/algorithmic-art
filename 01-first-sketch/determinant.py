import numpy as np


def vertical_array():
    arr = np.arange(0, 10)
    zeros = np.zeros(10)
    line = np.vstack((arr, zeros)).T
    return line


transformation = np.array([[2, 1], [3, 5]])

if __name__ == "__main__":
    a = vertical_array()
    b = np.matmul(a, transformation)
    print(b)
