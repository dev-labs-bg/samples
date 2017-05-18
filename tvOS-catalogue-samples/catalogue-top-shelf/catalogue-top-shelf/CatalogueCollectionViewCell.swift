//
//  CatalogueCollectionViewCell.swift
//  catalogue-tvos
//
//  Created by DevLabs BG on 3/31/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import UIKit

class CatalogueCollectionViewCell: UICollectionViewCell {
  
  // MARK: - Singleton properties
  
  // MARK: - Static properties
  
  // MARK: - Public Properties
  
  /// public property to store the text for the title label
  internal var titleText: String? {
    didSet {
      titleLabel.text = titleText
    }
  }
  
  /// public property to store the text for the title image
  internal var titleImage: UIImage! {
    didSet {
      titleImageView.image = titleImage
    }
  }
  
  // MARK: - Public Methods
  
  // MARK: - Initialisation/Lifecycle Methods
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    setupUI()
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    
    setupUI()
  }
  
  // MARK: - Override Methods
  
  override func layoutSubviews() {
    super.layoutSubviews()
    
    let titleImageViewHeight = bounds.height - bounds.height / 8
    let labelHeight = bounds.height - titleImageViewHeight
    
    titleImageView.frame = CGRect(x: 0, y: 0, width: bounds.width, height: titleImageViewHeight)
    titleLabel.frame = CGRect(x: -32, y: titleImageView.frame.maxY + 24, width: bounds.width, height: labelHeight).integral
  }
  
  override func didUpdateFocus(in context: UIFocusUpdateContext, with coordinator: UIFocusAnimationCoordinator) {
    super.didUpdateFocus(in: context, with: coordinator)
    
    if context.nextFocusedView == self {
      UIView.animate(withDuration: 0.2, animations: {
        self.titleLabel.isHidden = false
        self.titleLabel.transform = self.titleLabel.transform.scaledBy(x: self.scaleFactor, y: self.scaleFactor)
        self.titleLabel.contentScaleFactor = self.scaleFactor
      })
    } else {
      UIView.animate(withDuration: 0.2) {
        self.titleLabel.isHidden = true
        self.titleLabel.transform = CGAffineTransform.identity
      }
    }
  }
  
  // MARK: - Private Properties
  
  /// private property to represent an image view on the UI
  fileprivate var titleImageView: UIImageView! {
    didSet {
      titleImageView.adjustsImageWhenAncestorFocused = true
      addSubview(titleImageView)
    }
  }
  
  /// private property to represent a label for the title on the UI
  fileprivate var titleLabel: UILabel! {
    didSet {
      titleLabel.textColor = .white
      titleLabel.font = titleLabel.font.withSize(16)
      addSubview(titleLabel)
    }
  }
  
  /// private property to store the scale factor for the titleLabel zooming animation
  fileprivate  let scaleFactor: CGFloat = 1.4
  
  // MARK: - Private Methods
  
  /**
   Private method for basic UI configuration
   */
  internal func setupUI() {
    titleImageView = UIImageView()
    titleLabel = UILabel()
    titleLabel.isHidden = true
  }
}
