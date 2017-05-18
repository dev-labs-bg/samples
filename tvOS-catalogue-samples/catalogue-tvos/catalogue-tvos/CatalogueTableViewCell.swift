//
//  CatalogueTableViewCell.swift
//  catalogue-tvos
//
//  Created by DevLabs BG on 3/31/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import UIKit

protocol CatalogueTableViewCellDelegate: class {
  
  func didSelectItem(inCell cell: CatalogueCollectionViewCell)
}

class CatalogueTableViewCell: UITableViewCell {

  // MARK: - Singleton properties
  
  // MARK: - Static properties
  
  // MARK: - Public Properties
  
  /// public property to store the text for each label in the cell
  internal var titles: [String]!
  
  /// public property to store the text for each imageView in the cell
  internal var images: [UIImage]! {
    didSet {
      catalogueCollectionView.reloadData()
    }
  }
  
  internal var delegate: CatalogueTableViewCellDelegate!
  
  // MARK: - Public Methods
  
  // MARK: - Initialisation/Lifecycle Methods
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    setupUI()
  }
  
  // MARK: - Override Methods
  
  override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
    super.init(style: style, reuseIdentifier: reuseIdentifier)
    setupUI()
  }
  
  override func layoutSubviews() {
    super.layoutSubviews()
    
    catalogueCollectionView.frame = CGRect(x: 0, y: 0, width: bounds.width, height: bounds.height)
    
    let itemSize = CGSize(width: bounds.width * 0.15, height: bounds.height - cellOffset)
    catalogueCollectionView.contentSize = CGSize(width: itemSize.width * CGFloat(titles.count), height: bounds.height)
    (catalogueCollectionView.collectionViewLayout as? UICollectionViewFlowLayout)?.itemSize = itemSize
  }
  
  // MARK: - Private Properties
  
  /// private property to store the collection cell's identifier
  fileprivate var collectionCellIdentifier = "CATALOG_COLLECTION_CELL_ID"
  
  /// private property to store the UICOllectionView of the row
  fileprivate var catalogueCollectionView: UICollectionView! {
    didSet {
      catalogueCollectionView.register(CatalogueCollectionViewCell.self, forCellWithReuseIdentifier: collectionCellIdentifier)
      catalogueCollectionView.delegate = self
      catalogueCollectionView.dataSource = self
      catalogueCollectionView.backgroundColor = .clear
      catalogueCollectionView.showsHorizontalScrollIndicator = false
      addSubview(catalogueCollectionView)
    }
  }
  
  /// private property to store the top/bottom/left/right margins around the collection view cell
  fileprivate let cellOffset: CGFloat = 50
  
  // MARK: - Private Methods
  
  /**
   Private method for basic UI configuration
   */
  fileprivate func setupUI() {
    let layout = UICollectionViewFlowLayout()
    layout.scrollDirection = .horizontal
    
    catalogueCollectionView = UICollectionView(frame: CGRect.zero, collectionViewLayout: layout)
  }
}

// MARK: - UICollectionViewDelegate methods
extension CatalogueTableViewCell: UICollectionViewDelegate {
  func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
    if let _cell = collectionView.cellForItem(at: indexPath) as? CatalogueCollectionViewCell {
      delegate?.didSelectItem(inCell: _cell)
    }
  }
}

// MARK: - UICollectionViewDataSource method
extension CatalogueTableViewCell: UICollectionViewDataSource {
  func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    if titles != nil {
      return titles.count
    } else {
      return 0
    }
  }
  
  func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
    if let cell = collectionView.dequeueReusableCell(withReuseIdentifier: collectionCellIdentifier, for: indexPath) as? CatalogueCollectionViewCell {
      cell.titleText = titles[indexPath.item] + String(indexPath.item + 1)
      cell.titleImage = images[indexPath.item]
      return cell
    } else {
      return UICollectionViewCell()
    }
  }
}

// MARK: - UICollectionViewDelegateFlowLayout methods
extension CatalogueTableViewCell: UICollectionViewDelegateFlowLayout {
  func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
    return UIEdgeInsets(top: cellOffset / 2, left: cellOffset, bottom: cellOffset / 2, right: cellOffset)
  }
  
  func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumInteritemSpacingForSectionAt section: Int) -> CGFloat {
    return cellOffset
  }
  
  func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, minimumLineSpacingForSectionAt section: Int) -> CGFloat {
    return cellOffset
  }
}
