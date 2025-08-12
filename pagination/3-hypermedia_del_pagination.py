from typing import Dict

def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
    """Return a page of data starting from `index` with deletion resilience"""
    assert isinstance(index, int) and index >= 0
    indexed_data = self.indexed_dataset()
    assert index < len(indexed_data)

    data = []
    current_index = index

    # Collect page_size items, skipping missing keys
    while len(data) < page_size and current_index in indexed_data:
        data.append(indexed_data[current_index])
        current_index += 1
        # Skip missing indices
        while current_index not in indexed_data and current_index < max(indexed_data.keys()) + 1:
            current_index += 1

    return {
        "index": index,
        "data": data,
        "page_size": len(data),
        "next_index": current_index
    }

