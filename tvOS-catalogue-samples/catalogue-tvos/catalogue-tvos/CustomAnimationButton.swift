//
//  CustomAnimationButton.swift
//  catalogue-tvos
//
//  Created by DevLabs BG on 3/31/17.
//  Copyright © 2017 Devlabs. All rights reserved.
//

import UIKit

class CustomAnimationButton: UIButton {

  // MARK: - Singleton properties
  
  // MARK: - Static properties
  
  // MARK: - Public properties
  
  // MARK: - Public methods
  
  // MARK: - Initialize/Livecycle methods
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    
    layer.cornerRadius = 10
    clipsToBounds = true
  }
  
  // MARK: - Override methods
  
  override func didUpdateFocus(in context: UIFocusUpdateContext, with coordinator: UIFocusAnimationCoordinator) {
    if context.nextFocusedView == self {
      UIView.animate(withDuration: 0.5,
                     animations: {
                      let scaleFactor: CGFloat = 1.2
                      self.transform = self.transform.scaledBy(x: scaleFactor, y: scaleFactor)
                      self.titleLabel?.contentScaleFactor = scaleFactor
      },
                     completion: nil)
    } else {
      
      UIView.animate(withDuration: 0.5) {
        self.transform = CGAffineTransform.identity
        self.titleLabel?.contentScaleFactor = UIScreen.main.scale
      }
    }
  }
  
  // MARK: - Private properties
  
  // MARK: - Private methods

}
